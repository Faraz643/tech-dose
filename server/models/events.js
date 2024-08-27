import { connection } from "../db.config.js";

export default async function createEventsTable() {
  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    start_time VARCHAR(100) NOT NULL,
    end_time VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    max_participants INT,
    thumbnail VARCHAR(255) NOT NULL,
    event_id INT NOT NULL UNIQUE);
    `;

  try {
    await connection.query(createEventsTableQuery);
    console.log("Events table setup successfully!");
  } catch (err) {
    console.error("Error setting up events table:", err);
    throw err;
  }
}

export async function deletedEventsTable() {
  const deleteTable = `DROP TABLE events`;
  try {
    await connection.query(deleteTable);
    console.log("deleted events table!");
  } catch (err) {
    console.error("Error deleting events table:", err);
    // Handle specific errors if needed
  }
}
