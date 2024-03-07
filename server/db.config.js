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
export const connection = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1111",
  database: "tdsample",
  port: "3306",
});

// export default T_D_DB;
// module.exports = connection
