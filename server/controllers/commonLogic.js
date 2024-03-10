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
  // const thumbnailFile = req.file;
  // res.status(200).send({title: title, desc: description, slug: slug, image: thumbnailFile});
  const addNewArticle = `
  INSERT INTO users (
    title, description, thumbnail, slug, written_by
  ) VALUES (${title}, ${description},${req.file.path} ${slug}, Faraz );
  `;
  try {
    await connection.query(addNewArticle);
    res.status(200).json({ message: "Form submitted Successfully " });
  } catch (err) {
    res
      .status(500)
      .json({ message: `An Error occured while submitting form ${err}` });
  }
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
