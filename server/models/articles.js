import { connection } from "../db.config.js";

export default async function createArticlesTables() {
  const createArticleTablesQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      thumbnail VARCHAR(255) NOT NULL,
      slug VARCHAR(300) NOT NULL
      month VARCHAR(20) NOT NULL
      year VARCHAR(20) NOT NULL
      author VARCHAR(100) NOT NULL
      author_id INT NOT NULL
      time VARCHAR(20) NOT NULL
      CONSTRAINT fk_author_id FOREIGN KEY (author_id) REFERENCES users(id)
      );
      `;

  // try {
  //   await connection.query(createArticleTablesQuery);
  //   console.log("Article table setup");
  // } catch (err) {
  //   console.error("Error setting up articles table:", err);
  //   // Handle specific errors if needed
  // }
  // return connection
  //   .query(createArticleTablesQuery)
  //   .then(() => console.log("articles Table setup successfully!"))
  //   .catch((err) => console.error("Error setting article table:", err));

  try {
    await connection.query(createArticleTablesQuery);
    console.log("Articles Table setup successfully!");
  } catch (err) {
    console.error("Error setting articles table:", err);
    throw err; // Re-throw the error to propagate it upwards if needed
  }
}

export async function deletedArticlesTable() {
  const deleteTable = `DROP TABLE articles`;
  try {
    await connection.query(deleteTable);
    console.log("deleted articles table!");
  } catch (err) {
    console.error("Error deleting articles table:", err);
  }
}
