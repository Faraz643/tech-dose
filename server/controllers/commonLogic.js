import { connection } from "../db.config.js";
import path from "path";
// const fs = require("fs").promises;
import fs from "fs/promises";
import { storeExcelInDb } from "../uploadExcel.js";
import { ref, uploadBytes } from "firebase/storage";
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
  const { title, description, slug, month, year, dateTime } = req.body;
  const thumbnailPath = req.file;
  console.log(thumbnailPath.buffer);
  if (!thumbnailPath)
    return res.status(422).json({ message: "Please add a thumbnail from if" });
  try {
    const storageRef = ref(
      fireBaseStorage,
      `images/${thumbnailPath.originalname}`
    );
    await uploadBytes(storageRef, thumbnailPath.buffer);
    return res.status(200).send("File Uploaded Successfully");
    // console.log(req.file);
    //     const insertArticleQuery = `
    //   INSERT INTO articles (title, description, thumbnail, slug, month, year, time, author, author_id)
    //   VALUES (?, ?, ?, ?, ?, ?,?,?,?)
    // `;
    //     connection
    //       .query(insertArticleQuery, [
    //         title,
    //         description,
    //         thumbnailPath,
    //         slug,
    //         month,
    //         year,
    //         dateTime,
    //         "Faraz",
    //         1,
    //       ])
    //       .then(() => {
    //         res.status(201).json({ message: "Article Published" });
    //         console.log("Article Published");
    //       })
    // .catch((err) => console.error("Error adding article:", err))
  } catch (e) {
    console.error("Error uploading file:", e); // Log the specific error

    if (e.code === "storage/unauthorized") {
      return res
        .status(403)
        .json({ message: "Unauthorized access to Firebase Storage" });
    } else if (e.code === "storage/quota-exceeded") {
      return res
        .status(403)
        .json({ message: "Firebase Storage quota exceeded" });
    } else if (e.code === "storage/invalid-argument") {
      return res
        .status(400)
        .json({ message: "Invalid argument provided to Firebase Storage" });
    } else if (e.code === "storage/retry-limit-exceeded") {
      return res
        .status(503)
        .json({
          message: "Retry limit exceeded while accessing Firebase Storage",
        });
    } else {
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
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
    .catch((err) => console.log("Error Updating article:", err));
};

async function deleteFile(filePath) {
  try {
    await fs.unlink("images/article-thumbnail/" + filePath);
    // await fs.unlink(toString(filePath));
  } catch (err) {
    console.error({ message: "Error while deleting file", err });
  }
}

export const deleteArticle = (req, res) => {
  const slug = req.params.slug;
  const thumbnailPath = req.body.thumbnailPath;
  const deleteQuery = `
    DELETE FROM articles WHERE slug=?`;
  connection
    .query(deleteQuery, [slug])
    .then((result) => {
      res.status(204).end();
      console.log({ message: "Article Deleted Successfully" });
    })
    .catch((error) => {
      res.status(200).json({ message: "Resource can not be Deleted" });
      console.log({ message: "An error occured" });
    });
  deleteFile(thumbnailPath);
  res.json({ status: "Article deleted" });
};

export const uploadArticleByFile = async (req, res) => {
  // console.log(file.buffer);
  console.log(req.files.excelFile[0].fieldname);
  const file = req.files.excelFile;
  const thumbnailsArray = req.imageUrls || null;
  // console.log(excelFile);
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    storeExcelInDb(thumbnailsArray, file, "articles")
      .then(() => {
        console.log("Articles Uploaded through an excel file");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    return res.send({ message: "articles uploaded succesfully" });
  } catch (e) {
    return res
      .status(500)
      .json({ Message: "An Error Occured while processing the file" });
  }
};
