import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dbConnect from "./config/dbConnect.js";
import userRoute from "./router/userRoute.js";
import adminRouter from "./router/adminRoute.js";

const NODE_ENV = "production";

dotenv.config();
dbConnect();
const app = express();
app.use(cors());
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/admin", adminRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
const __dirname = path.resolve();

if (NODE_ENV == "production") {
  // app.use(express.static(__dirname + "/frontend/dist"));
  app.use(express.static("/var/www/seclob/octtaview/frontend/dist"));

  app.get("*", (req, res) => {
    // res.sendFile(__dirname + "/frontend/dist/index.html");
    res.sendFile("/var/www/seclob/octtaview/frontend/dist/index.html");
  });
} else {
  app.get("/", (req, res) => {
    res.status(201).json("Running");
  });
}

app.listen(port, () => {
  console.log(`Server connected ${port}`);
});
