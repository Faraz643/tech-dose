import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
// const T_D_DB = {
//   development: {
//     host: process.env.MYSQL_HOST,
//     database: process.env.MYSQL_DATABASE,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     port: process.env.MYSQL_PORT,
//   },
// };

// export const connection = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   port: process.env.MYSQL_PORT,
// });
// Define your MySQL connection URL
const dbUrl =
  process.env.MYSQL_URL;

// Create a MySQL connection using the URL
export const connection = mysql.createPool(dbUrl);
// export default T_D_DB;
// module.exports = connection
