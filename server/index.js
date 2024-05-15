import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";
import { createUsersTable } from "./models/users.js";
import { createRolesTable } from "./models/roles.js";
import { createArticlesTables } from "./models/articles.js";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import { createProxyMiddleware } from "http-proxy-middleware";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

const port = 3001;
// middleWares

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend origin
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

// app.use("/", proxy); // Apply proxy to all routes

app.use(express.json());
app.use("/api/article", articleActions);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
