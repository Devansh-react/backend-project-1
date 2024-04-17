import mongoose, {Schema} from "mongoose"
 const subscriptionSchema= new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
 },{timestamps:true})

 export const subscription=mongoose.model("subscription",subscriptionSchema)