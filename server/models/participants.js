import { connection } from "../db.config.js";

export default async function createParticipantsTable() {
  const createParticipantsTableQuery = `
    CREATE TABLE IF NOT EXISTS participants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_event_id FOREIGN KEY (event_id) REFERENCES events(id)
);
    `;

  try {
    await connection.query(createParticipantsTableQuery);
    console.log("participants table setup successfully!");
  } catch (err) {
    console.error("Error setting up participants table:", err);
    throw err;
  }
}

export async function deletedParticipantsTable() {
  const deleteTable = `DROP TABLE participants`;
  try {
    await connection.query(deleteTable);
    console.log("deleted participants table!");
  } catch (err) {
    console.error("Error deleting participants table:", err);
    // Handle specific errors if needed
  }
}
