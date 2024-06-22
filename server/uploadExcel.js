import xlsx from "xlsx";
import { connection } from "./db.config.js";
export const storeExcelInDb = async (
  thumbnailsArray,
  excelFilePath,
  tableName
) => {
  try {
    // Read the Excel file into a workbook
    const workbook = xlsx.read(excelFilePath[0].buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    if (data.length === 0) {
      console.log("No data found in the Excel file.");
      return;
    }
    // Extract columns from the first row of data
    // const columns = Object.keys(data[0]);

    // Construct the insert query
    // const insertQuery = `INSERT INTO \`${tableName}\` (${columns
    //   .map((column) => `\`${column}\``)
    //   .join(", ")}) VALUES ?`;
    // const values = data.map((row) => columns.map((column) => row[column]));

    // // Execute the query
    // await connection.query(insertQuery, [values]);

    data.forEach((row, index) => {
      const { title, description, slug, author, month, year } = row;
      const thumbnail = thumbnailsArray[index] || null;
      const insertQuery =
        "INSERT INTO articles (title, description, slug, author, thumbnail,month,year) VALUES (?, ?, ?, ?, ?,?,?)";
      connection.query(insertQuery, [
        title,
        description,
        slug,
        author,
        thumbnail,
        month,
        year,
      ]);
      // console.log(title, ":", thumbnail);
    });
  } catch (error) {
    console.error("Error:", error);
  }
};

// Call the function with the file path and table name
