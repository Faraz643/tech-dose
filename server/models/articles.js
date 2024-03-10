import { connection } from "../db.config.js";

export async function createArticlesTables() {
  const createArticleTablesQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      thumbnail VARCHAR(255) NOT NULL,
      slug VARCHAR(300) NOT NULL,
      );
      `;
  // CONSTRAINT fk_written_by FOREIGN KEY (written_by) REFERENCES users(id)
  // month DATETIME DEFAULT(getdate()) NOT NULL,
  // tag VARCHAR(50),
  // written_by INT NOT NULL,

  // try {
  //   await connection.query(createArticleTablesQuery);
  //   console.log("Article table setup");
  // } catch (err) {
  //   console.error("Error setting up articles table:", err);
  //   // Handle specific errors if needed
  // }
  return connection
    .query(createArticleTablesQuery)
    .then(() => console.log("articles Table setup successfully!"))
    .catch((err) => console.error("Error setting article table:", err));
}
