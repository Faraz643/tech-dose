import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import articleActions from "./routes/commonApi.js";
// const userModel = require("./models/users.js");
import { createUsersTable } from "./models/users.js";
const app = express();
const port = 3001;

createUsersTable()
  .then(() =>
    console.log(
      "Table creation triggered (actual execution might be asynchronous)"
    )
  )
  .catch((err) => console.error("Error triggering table creation:", err));
app.use("/api/article", articleActions);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
