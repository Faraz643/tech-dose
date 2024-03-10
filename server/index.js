import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";
import { createUsersTable } from "./models/users.js";
import { createRolesTable } from "./models/roles.js";
import { createArticlesTables } from "./models/articles.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3001;
app.use(cors());
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true })); // Adjust extended option if needed
app.use(bodyParser.raw({ limit: "1mb" }));

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
// createAllTables();
// createArticlesTables()
//   .then(() => console.log("Article table created !"))
//   .catch((err) => console.log("Error while creating articles table !", err));
app.use(express.json());
app.use("/api/article", articleActions);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
