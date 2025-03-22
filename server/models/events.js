import { connection } from "../db.config.js";

export default async function createEventsTable() {
  const createEventsTableQuery = `
    CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description TEXT NOT NULL,
    start_time VARCHAR(100) NOT NULL,
    end_time VARCHAR(100) NOT NULL,
    event_date VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
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


export async function updateEventsColumn(){
  const updateColumn = `ALTER TABLE events ADD COLUMN status VARCHAR(20) NOT NULL;`
  try{
    await connection.query(updateColumn)
    console.log('Added column(s) in events table')
  }catch(err){
    console.error('Error adding new column(s) in events table:', err)
  }
}