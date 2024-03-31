import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
export {app}

const app = express()

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true , limit:"20kb"}))
app.use(express.static("public"))

//routers import
 import router from "./routes/user.router.js";

//  router call ---> they are call like a middleware so we use app.use

app.use("/user", router)