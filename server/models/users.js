// const connection = require("../db.config.js");
import { connection } from "../db.config.js";

export default async function createUsersTable() {
  const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    enroll_id INT NOT NULL,
    password INT NOT NULL,
    email VARCHAR(200) NOT NULL,
    year INT NOT NULL,
    branch VARCHAR(100),
    user_role INT NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY (user_role) REFERENCES roles(id)
  );
        
    `;

  try {
    await connection.query(createUsersTableQuery);
    console.log("Users Table setup successfully!");
  } catch (err) {
    console.error("Error setting up Users table:", err);
    throw err; // Re-throw the error to propagate it upwards if needed
  }
}
// ADD COLUMN year INT NOT NULL,
//     ADD COLUMN branch VARCHAR(100),
//     ADD COLUMN role VARCHAR(100) NOT NULL
export async function addNewColumnUsersTable() {
  const addNewColumnsQuery = `
    ALTER TABLE users
    ADD COLUMN mail VARCHAR(100) NOT NULL
`;
  try {
    await connection.query(addNewColumnsQuery);
    console.log("adding a new column in users!");
  } catch (err) {
    console.error("Error adding a new column in users", err);
    // Handle specific errors if needed
  }
}

export async function deletedUsersTable() {
  const deleteTable = `DROP TABLE users`;
  try {
    await connection.query(deleteTable);
    console.log("deleted users table!");
  } catch (err) {
    console.error("Error deleting users table:", err);
    // Handle specific errors if needed
  }
}
