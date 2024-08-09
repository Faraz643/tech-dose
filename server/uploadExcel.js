import xlsx from "xlsx";
import { connection } from "./db.config.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireBaseStorage } from "./firebase.js";

export const storeExcelInDb = async (
  imageBuffer,
  excelFilePath,
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

    // data.forEach(async (row, index) => {
    for (const [index, row] of data.entries()) {
      const { title, description, slug, author, month, year } = row;

      const dateTime = formatDate();
      // console.log('this is thumbnail from publishArticle function', thumbnail)
      // Getting full month name (e.g. "September")
      const today = new Date();
      const ArticleMonth = today.toLocaleString("default", { month: "long" });
      const ArticleYear = today.getFullYear();

      // const thumbnail = thumbnailsArray[index] || null;
      const metaData = {
        contentType: "image/png",
      };
      const thumbnailBuffer = imageBuffer[index] || null;
      const thumbnailPath = Date.now();
      const author_id = 1;
      const storageRef = ref(fireBaseStorage, `images/${thumbnailPath}`);
      await uploadBytes(storageRef, thumbnailBuffer, metaData);
      const thumbnailDownloadURL = await getDownloadURL(storageRef);

      const insertQuery =
        "INSERT INTO articles (title, description, slug, author, thumbnail,month,year,author_id, time) VALUES (?, ?, ?, ?, ?,?,?,?, ?)";
      connection.query(insertQuery, [
        title,
        description,
        slug,
        author,
        thumbnailDownloadURL,
        ArticleMonth,
        ArticleYear,
        author_id,
        dateTime,
      ]);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

function formatDate() {
  const date = new Date();

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day} ${month} ${hours}:${minutes}:${seconds}`;
}
