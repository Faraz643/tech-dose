import "./envConfig.js";
import express from "express";
import serverless from "serverless-http";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";

import createUsersTable, { deletedUsersTable } from "./models/users.js";
import createArticlesTables, {
  deletedArticlesTable,
} from "./models/articles.js";
import createRolesTable, { deletedRolesTable } from "./models/roles.js";
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

const port = process.env.PORT || 3001;
// console.log(typeof JSON.parse(process.env.FIREBASE_PRIVATE_KEY))
// Allow requests from your frontend origin
const allowedOrigins = [
  "http://localhost:3000",
  "https://tech-dose.vercel.app",
  "https://tech-dose-view.onrender.com",
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If you need to include cookies in the requests
  })
);
// Enable pre-flight handling
app.options("*", cors());

// app.use(cors(corsOptions));
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
    // conn.release();
  } catch (err) {
    console.error("Error connecting to the database:", err.message);
  }
}

// Check and log the connection status
checkConnection();

// await deletedArticlesTable();
// await deletedRolesTable();
// await deletedUsersTable();

async function createAllTables() {
  try {
    await createRolesTable();
    await createUsersTable();
    await createArticlesTables();
  } catch (err) {
    console.error("Error during database creating tables:", err);
  }
}

// createAllTables();

client.on("error", (err) => {
  console.log({ "Redis Error": "In-Memory storage", "Error Name": err });
});
client.on("connect", () => {
  console.log("Attempting to connect to Redis...");
});
client.on("ready", () => {
  console.log("Successfully connected to Redis!");
});
client.connect();

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
app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(port, () => {
  console.log("200! OK");
});
