import { connection } from "../db.config.js";

export const showAllArticles = (req, res) => {
  // send user role to req while fetching from client, if role is admin ? showAll: fetch article from db using loggedin author name
  // res.send(req.body)
};

export const showSingleArticle = (req, res) => {
  console.log(req.params); // search single article
  res.json({ status: "Show Single Article" });
};

// @middleware -> check if user is admin || or editor
export const addArticle = async (req, res) => {
  const { title, description, slug } = req.body;
  const thumbnailPath = req.file.destination + "/" + req.file.filename;
  const insertArticleQuery = `
  INSERT INTO articles (title, description, thumbnail, slug)
  VALUES (?, ?, ?, ?)
`;
  connection
    .query(insertArticleQuery, [title, description, thumbnailPath, slug])
    .then(() => {
      res.status(201).json({ message: "Article Published" });
      console.log("Article Published");
    })
    .catch((err) => console.error("Error inserting article:", err));
};

// @middleware -> check if user is admin || updating article author name === loggedin user name
export const updateArticle = (req, res) => {
  console.log(req.params); // update  article

  res.json({ status: "Article updated" });
};

// @middleware -> check if user is admin || deleting article author name === loggedin user name
export const deleteArticle = (req, res) => {
  console.log(req.params); // delete article
  res.json({ status: "Article deleted" });
};
