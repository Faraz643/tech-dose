import express from "express";
import adminRouter from "./routes/admin.js";
import authRouter from "./routes/auth.js";
import commonApi from "./routes/commonApi.js";
const app = express();
const port = 3001;

app.use("/api/article", commonApi);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
