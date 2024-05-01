import mongoose,{Schema} from "mongoose";
import { comment } from "./comment.model";
const likeSchema =Schema({
    video:{
        types:Schema.Types.ObjectId,
        ref:"video"
    },
    comment:{
        types:Schema.Types.ObjectId,
        ref:"comment"
    },
    tweet:{
        types:Schema.Types.ObjectId,
        ref:"tweet"
    },
    liked_by:{ 
        type:Schema.Types.ObjectId,
        ref:"user"
    }




},{timestamps:true});

export const like= mongoose.model("like",likeSchema);