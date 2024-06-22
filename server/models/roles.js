// const connection = require("../db.config.js");
import { connection } from "../db.config.js";

export async function createRolesTable() {
  const createRolesTableQuery = `
  CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
  );
  
    `;
  return connection
    .query(createRolesTableQuery)
    .then(() => console.log("Roles Table setup successfully!"))
    .catch((err) => console.error("Error setting roles table:", err));
}
