 import dotenv from "dotenv"
import mongoose from "mongoose"
import { DB_NAME } from "./constants.js"
import  connectDatabase from "./db/db.js"
import { app } from "./app.js"
dotenv.config({
    path:"./env"
}
)


connectDatabase()
.then(()=>{
    app.on("error",(error)=>{
        console.error("app has some error :", error);
        throw error;

    })
    
    app.listen(process.env.PORT || 8000 , ()=>{
        console.log(`app is running on PORT ${process.env.PORT}`)
    })
    
}
)
.catch( (error)=>{
    console.error("MONGODB connection failed", error)
})











// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)//<--- database connect using async try catch function
//         app.on("error" , (error)=>{
//             console.log("error", error)
//             throw error;
//         })

//         app.listen(procress.env.PORT, ()=>{
//             console.log(`app is listening on port ${procress.env.PORT}`)
//         })

//     } catch (error) {
//         console.error("error", error)
//         throw error

//     }
// })()