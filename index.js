import express from "express" ;
import bodyParser from "body-parser";
import cors from "cors" ;
import morgan from "morgan";
import { configDotenv } from "dotenv";
import { DBConnection } from "./Config/DbConnection.js";
import { globalError } from "./Middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

import authRouter from "./Router/authRouter.js"
import courseRouter from "./Router/courseRouter.js"
import wishListRouter from "./Router/wishListRouter.js"
import ownCourseRouter from "./Router/ownCourseRouter.js"
import newestRouter from "./Router/newestRouter.js"
import UserRouter from "./Router/UserRouter.js"
configDotenv({path : "config/config.env"})
const app = express() ;
DBConnection();
const PORT = process.env.PORT || 2000 ;
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
if(process.env.NODE_ENV == "development"){
    app.use(morgan("dev"))
    console.log("Mode : Development")
}else if(process.env.NODE_ENV == "production"){
  app.use(morgan("dev"))
    console.log("Mode : Production")
} 

app.use("/api/auth/", authRouter)
app.use("/api/course/", courseRouter)
app.use("/api/newest/", newestRouter)
app.use("/api/wishList/", wishListRouter)
app.use("/api/ownCourse/", ownCourseRouter)
app.use("/api/user/", UserRouter)
//global error Middleware 
app.use(globalError);


app.listen(PORT ,async ()=>{
    console.log(`server is running on port ${PORT} ! `)
})
