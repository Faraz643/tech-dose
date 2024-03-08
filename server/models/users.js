// const connection = require("../db.config.js");
import { connection } from "../db.config.js";

export async function createUsersTable() {
  const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    enroll_id INT NOT NULL,
    year INT NOT NULL,
    branch VARCHAR(100),
    role INT NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY (role) REFERENCES roles(id)
  );
        
    `;

  try {
    await connection.query(createUsersTableQuery);
    console.log("user table setup!");
  } catch (err) {
    console.error("Error setting up user table:", err);
    // Handle specific errors if needed
  }
}

async function addNewColumnUsersTable() {
  const addNewColumnsQuery = `
    ALTER TABLE users
    ADD COLUMN year INT NOT NULL,
    ADD COLUMN branch VARCHAR(100),
    ADD COLUMN role VARCHAR(100) NOT NULL
    
`;
  try {
    await connection.query(createArticleTablesQuery);
    console.log("adding a new column in users!");
  } catch (err) {
    console.error("Error adding a new column in users", err);
    // Handle specific errors if needed
  }
}

async function deleteUsersTable() {
  const deleteTable = `DROP TABLE users`;
  try {
    await connection.query(createArticleTablesQuery);
    console.log("deleting article table!");
  } catch (err) {
    console.error("Error deleting articles table:", err);
    // Handle specific errors if needed
  }
}
