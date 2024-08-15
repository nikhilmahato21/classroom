import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import classroomRouter from "./routes/classroomRoutes.js";
import userRouter from "./routes/userRoutes.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/auth", authRouter);
app.use('/api/classrooms', authMiddleware, classroomRouter);
app.use('/api/users',authMiddleware, userRouter);


app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./public','index.html'))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
