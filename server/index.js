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
import { connection } from "./db.config.js";
import { client } from "./redisClient.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config();
// const port = 3001;
const port = process.env.PORT || 3000;
// cors middleWares

// ============
// const corsOptions = {
//   origin: process.env.FRONT_END_ORIGIN, // Replace with your frontend origin
//   credentials: true, // Allow cookies (optional)
//   exposedHeaders: ["Set-Cookie", "X-My-Custom-Header", "Content-Range"],
//   allowedHeaders: [
//     "Origin",
//     "X-Requested-With",
//     "Content-Type",
//     "Accept",
//     "Authorization",
//   ],
//   // List of headers to expose
// };
// app.use(cors(corsOptions));
// ============

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.raw({ limit: "1mb" }));
app.use(express.static("images"));
app.use(cookieParser());

// Function to check and log the connection status
async function checkConnection() {
  try {
    // Get a connection from the pool
    const conn = await connection.getConnection();
    console.log("Successfully connected to the database.");
    // Release the connection back to the pool
    conn.release();
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

// Check and log the connection status
checkConnection();

// =============

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     process.env.FRONT_END_ORIGIN || "http://localhost:3000"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Expose-Headers",
//     "Set-Cookie, X-My-Custom-Header, Content-Range"
//   );
//   next();
// });
// =============
function createAllTables() {
  createRolesTable()
    .then(() => console.log("Roles table created !"))
    .catch((err) => console.log("Error while creating roles table !", err));
  createUsersTable()
    .then(() =>
      console.log(
        "Table creation triggered (actual execution might be asynchronous)"
      )
    )
    .catch((err) => console.error("Error triggering table creation:", err));
}

// comment out below line to create all tables
createAllTables();
createArticlesTables()
  .then(() => console.log("Article table created !"))
  .catch((err) => console.log("Error while creating articles table !", err));

client.on("error", (err) => {
  console.log("In-Memory storage", err);
});
client.on("connect", () => {
  console.log("Attempting to connect to Redis...");
});
client.on("ready", () => {
  console.log("Successfully connected to Redis!");
});
client.connect();

// =======================>
// Proxy all requests to backend
// const proxy = createProxyMiddleware({
//   target: "http://localhost:3001", // Change to your actual backend URL
//   changeOrigin: true, // Important for cookie sharing
// });
// <=======================

// function addUserColumn() {
//   addNewColumnUsersTable();
// }

// addUserColumn();

// app.use("/", proxy); // Apply proxy to all routes

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
app.use((req, res, next) => {
  res.send("hello");
});
app.listen(port, "0.0.0.0", () => {
  console.log("200! OK");
});
