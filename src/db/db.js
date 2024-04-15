import mongoose  from "mongoose"
import { DB_NAME } from "../constants.js"
 
const connectDatabase =async()=>{
    try {
        const connectiondatabasae =await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`)
        console.log(`\n mongodb connection succeed !!  DB_PORT : ${connectiondatabasae.connection.host}`  )
        
    } catch (error) {
        console.error("hey !! MONGODB connection error", error);
        process.exit(1)
    }
}

export default connectDatabase;