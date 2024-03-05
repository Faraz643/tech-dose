export const showAllArticles = (req, res) => {
  const query = req.query.month; // search articles based on filtering options
  res.json({ Status: `Show All Posts ${query}` });
};

export const showSingleArticle = (req, res) => {
  console.log(req.params); // search single article
  res.json({ status: "Show Single Article" });
};

// @middleware -> check if user is admin
export const addArticle = (req, res) => {
  res.json({ status: "Article added" });
};

// @middleware -> check if user is admin
export const updateArticle = (req, res) => {
  console.log(req.params); // update  article

  res.json({ status: "Article updated" });
};

// @middleware -> check if user is admin
export const deleteArticle = (req, res) => {
  console.log(req.params); // delete article
  res.json({ status: "Article deleted" });
};
