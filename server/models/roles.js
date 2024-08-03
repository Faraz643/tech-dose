// const connection = require("../db.config.js");
import { connection } from "../db.config.js";

export default async function createRolesTable() {
  const createRolesTableQuery = `
  CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
  );
  
    `;
  

  try {
    await connection.query(createRolesTableQuery);
    console.log("Roles Table setup successfully!");
  } catch (err) {
    console.error("Error setting roles table:", err);
    throw err; // Re-throw the error to propagate it upwards if needed
  }
}

export async function deletedRolesTable() {
  const deleteTable = `DROP TABLE roles`;
  try {
    await connection.query(deleteTable);
    console.log("deleted roles table!");
  } catch (err) {
    console.error("Error deleting roles table:", err);
  }
}
