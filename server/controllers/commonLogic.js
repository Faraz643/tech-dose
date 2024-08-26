import { connection } from "../db.config.js";
import path from "path";
// const fs = require("fs").promises;
import fs from "fs/promises";
import { storeExcelInDb } from "../uploadExcel.js";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { fireBaseStorage } from "../firebase.js";
export const showAllArticles = (req, res) => {
  // send user role to req while fetching from client, if role is admin ? showAll: fetch article from db using loggedin author name
  const showAllArticlesQuery = `SELECT * FROM articles`;
  connection
    .query(showAllArticlesQuery)
    .then((result) => {
      res.status(200).json(result[0]);
    })
    .catch((error) => {
      res.status(500).json({ message: "Error Occured" });
      // console.log(error);
    });
};
export const showImage = function (req, res) {
  // get the file param and define file path
  const fileName = req.params.fileName;
  const fileDestination = {
    root: "./images/article-thumbnail",
  };
  // send file
  res.sendFile(fileName, fileDestination, (err) => {
    if (err) {
      console.error(
        "Error while sending/Showing file:(Might be No Such file)",
        err
      );
    }
  });
};
export const showSingleArticle = (req, res) => {
  const slug = req.params.slug;
  const getSingleArticle = `
  SELECT * FROM articles WHERE slug=?
  `;
  connection
    .query(getSingleArticle, [slug])
    .then((result) => {
      // if(result)
      if (result[0].length === 0) {
        return res
          .status(404)
          .json({ message: "Article Not found in database" });
      }
      res.status(200).json({ articleData: result[0] });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// @middleware -> check if user is admin || or editor
export const addArticle = async (req, res) => {
  const { title, description, slug, month, year, dateTime, authorName } =
    req.body;
  const userId = req.userId;
  const thumbnailPath = req.file;
  const metaData = {
    contentType: "image/png",
  };
  if (!thumbnailPath) {
    return res.status(422).json({ message: "Please add a thumbnail" });
  }

  try {
    const storageRef = ref(
      fireBaseStorage,
      `images/${thumbnailPath.originalname}`
    );

    // Upload file to Firebase Storage
    await uploadBytes(storageRef, thumbnailPath.buffer, metaData);
    const thumbnailDownloadURL = await getDownloadURL(storageRef);
    // Insert article into database after file upload
    const insertArticleQuery = `
      INSERT INTO articles (title, description, thumbnail, slug, month, year, time, author, author_id)
      VALUES (?, ?, ?, ?, ?, ?,?,?,?)
    `;
    await connection.query(insertArticleQuery, [
      title,
      description,
      thumbnailDownloadURL, // Assuming you store the file name
      slug,
      month,
      year,
      dateTime,
      authorName,
      userId,
    ]);

    res.status(201).json({ message: "Article Published" });
  } catch (e) {
    console.error("Error processing request:", e);

    let statusCode = 500;
    let message = "Internal Server Error";

    switch (e.code) {
      case "storage/unauthorized":
        statusCode = 403;
        message = "Unauthorized access to Firebase Storage";
        break;
      case "storage/quota-exceeded":
        statusCode = 403;
        message = "Firebase Storage quota exceeded";
        break;
      case "storage/invalid-argument":
        statusCode = 400;
        message = "Invalid argument provided to Firebase Storage";
        break;
      case "storage/retry-limit-exceeded":
        statusCode = 503;
        message = "Retry limit exceeded while accessing Firebase Storage";
        break;
    }

    res.status(statusCode).json({ message });
  }
};

// @middleware -> check if user is admin || updating article author name === loggedin user name
export const updateArticle = async (req, res) => {
  const { title, description, slug } = req.body;
  const thumbnailPath = req.file?.filename || null;
  const articleToBeUpdated = req.params.slug;
  let tableColumns = [title, description, slug];
  const updateArticleQuery = `
UPDATE articles SET title=?, description=?, slug=? ${
    thumbnailPath ? ", thumbnail=?" : ""
  } WHERE slug=?`;
  if (thumbnailPath) {
    tableColumns.push(thumbnailPath);
  }
  tableColumns.push(articleToBeUpdated);
  connection
    .query(updateArticleQuery, tableColumns)
    .then(() => {
      res.status(201).json({ message: "Article Updated" });
    })
    .catch((err) => {
      console.log("Error Updating article:", err);
      res
        .status(500)
        .json({ message: "Internal Server Error, Please try after some time" });
    });
};

async function deleteFile(filePath) {
  try {
    await fs.unlink("images/article-thumbnail/" + filePath);
    // await fs.unlink(toString(filePath));
  } catch (err) {
    console.error({ message: "Error while deleting file", err });
  }
}

export const deleteArticle = async (req, res) => {
  const slug = req.params.slug;
  const thumbnailPath = req.body.thumbnailPath;

  // Decode the thumbnail URL
  const baseUrl =
    "https://firebasestorage.googleapis.com/v0/b/tech-dose-images.appspot.com/o/";
  const pathStartIndex = thumbnailPath.indexOf(baseUrl) + baseUrl.length;
  const pathEndIndex = thumbnailPath.indexOf("?alt=media");
  const encodedPath = thumbnailPath.substring(pathStartIndex, pathEndIndex);
  const decodedPath = decodeURIComponent(encodedPath);

  const fileRef = ref(fireBaseStorage, decodedPath);

  // Delete the article from the database
  const deleteQuery = `DELETE FROM articles WHERE slug=?`;

  try {
    const result = await connection.query(deleteQuery, [slug]);

    // Proceed to delete the file from Firebase Storage
    try {
      await deleteObject(fileRef);
      res.status(204).end(); // No content, operation was successful
    } catch (error) {
      console.error("Error deleting file from Firebase:", error);
      res
        .status(500)
        .json({ message: "Article deleted but file deletion failed" });
    }
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Failed to delete the article" });
  }
};

export const uploadArticleByFile = async (req, res) => {
  // console.log(file.buffer);
  const { authorName } = req.body;
  // console.log(req.files.excelFile[0].fieldname);
  const file = req.files.excelFile;
  const imageBuffer = req.imageBuffer;
  const userId = req.userId;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const publishedArticleResponse = await storeExcelInDb(
      imageBuffer,
      file,
      authorName,
      userId
    );

    if (publishedArticleResponse.success) {
      return res.send({ message: publishedArticleResponse.message });
    } else {
      return res
        .status(422)
        .json({ message: publishedArticleResponse.message });
    }
    // storeExcelInDb(imageBuffer, file, authorName)
    //   .then(() => {
    //     return res.send({ message: "Articles Uploaded Succesfully" });
    //   })
    //   .catch((err) => {
    //     return res.status(422).json({
    //       message:
    //         "Error uploading Articles, verify that the files are arranged in the correct sequence.",
    //     });
    //   });
  } catch (e) {
    return res
      .status(500)
      .json({ Message: "An Error Occured while processing the file" });
  }
};
