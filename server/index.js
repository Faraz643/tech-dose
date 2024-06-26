import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";
import { createUsersTable, addNewColumnUsersTable } from "./models/users.js";
import { createRolesTable } from "./models/roles.js";
import { createArticlesTables } from "./models/articles.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
import { storeExcelInDb } from "./uploadExcel.js";
import multer from "multer";
import invalidateToken from "./redisClient.js";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config();
const port = 3001;
// middleWares

const corsOptions = {
  origin: process.env.FRONT_END_ORIGIN, // Replace with your frontend origin
  credentials: true, // Allow cookies (optional)
  exposedHeaders: ["Set-Cookie", "X-My-Custom-Header", "Content-Range"], // List of headers to expose
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.raw({ limit: "1mb" }));
app.use(express.static("images"));
app.use(cookieParser());

// function createAllTables() {
//   createRolesTable()
//     .then(() => console.log("Roles table created !"))
//     .catch((err) => console.log("Error while creating roles table !", err));
//   createUsersTable()
//     .then(() =>
//       console.log(
//         "Table creation triggered (actual execution might be asynchronous)"
//       )
//     )
//     .catch((err) => console.error("Error triggering table creation:", err));
// }

// comment out below line to create all tables
// createAllTables();
// createArticlesTables()
//   .then(() => console.log("Article table created !"))
//   .catch((err) => console.log("Error while creating articles table !", err));

// Proxy all requests to backend
// const proxy = createProxyMiddleware({
//   target: "http://localhost:3001", // Change to your actual backend URL
//   changeOrigin: true, // Important for cookie sharing
// });

// function addUserColumn() {
//   addNewColumnUsersTable();
// }

// addUserColumn();

// app.use("/", proxy); // Apply proxy to all routes

// storeExcelInDb("random_data.xlsx", "articles")
//   .then(() => {
//     console.log("Done");
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });

app.use(express.json());
app.use("/api/article", articleActions);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

//Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle Multer-specific errors
    res.status(400).json({ error: err.message });
  } else if (
    err.message === "Invalid file type. Only .xlsx files are allowed."
  ) {
    // Handle custom file type validation error
    res.status(400).json({ error: err.message });
  } else {
    // Handle all other errors
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("200! OK");
});
