import express from "express";
import adminRouter from "./routes(api)/admin.js";
import authRouter from "./routes(api)/auth.js";
import commonApi from "./routes(api)/commonApi.js";
const app = express();
const port = 3000;

app.use("/api", commonApi);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log("200! OK");
});
