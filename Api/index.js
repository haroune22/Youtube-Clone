import  express  from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
const URL = process.env.URL;
import userRoutes from "./Routes/Users.js"
import commentRoutes from "./Routes/Comments.js"
import videoRoutes from "./Routes/Videos.js"
import authRoutes from "./Routes/auth.js"
import cookieParser from "cookie-parser";
import cors from 'cors'

app.use(express.json())
app.use(cors({ 
  origin: "http://localhost:3000" 
 }));

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err.reason);
    });
};
app.use(cookieParser())

app.use("/api/users", userRoutes);
app.use("/api/comments",commentRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/auth",authRoutes);
app.use((err,req,res,next)=>{
  const status = err.status || 500
  const message = err.message || "Somthing failed"
return res.status(status).json({
  success: false,
  status,
  message
})
})
app.listen(6700,()=>{
    connect()
    console.log('Connected to server port 6700')
})