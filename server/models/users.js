// const connection = require("../db.config.js");
import { connection } from "../db.config.js";

export function createUsersTable() {
  const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            enroll_id INT DEFAULT NULL
        )
    `;
  return connection
    .query(createUserTableQuery)
    .then(() => console.log("Table created successfully!"))
    .catch((err) => console.error("Error creating table:", err));
}

