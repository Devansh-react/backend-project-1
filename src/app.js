import { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
export {app}

const app = Express()

app.use( cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(Express.json({limit:"20kb"}))
app.use(express.urlencoded({extends:true , limit:"20kb"}))
app.use(express.static("public"))

