import { connection } from "../db.config.js";

export async function createArticlesTables() {
  const createArticleTablesQuery = `
    CREATE TABLE IF NOT EXISTS articles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      thumbnail BLOB NOT NULL,
      slug VARCHAR(300) NOT NULL,
      tag VARCHAR(50),  -- Optional tag
      month DATETIME NOT NULL,
      written_by INT NOT NULL,
      CONSTRAINT fk_written_by FOREIGN KEY (written_by) REFERENCES users(id)
    );
  `;

  try {
    await connection.query(createArticleTablesQuery);
    console.log("Article table setup");
  } catch (err) {
    console.error("Error setting up articles table:", err);
    // Handle specific errors if needed
  }
}
