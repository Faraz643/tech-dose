import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";
import { createUsersTable } from "./models/users.js";
import { createRolesTable } from "./models/roles.js";
import { createArticlesTables } from "./models/articles.js";

const app = express();
const port = 3001;
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
createArticlesTables()
  .then(() => console.log("Article table created !"))
  .catch((err) => console.log("Error while creating articles table !", err));

app.use("/api/article", articleActions);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
