import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema =new Schema({

    content:{
        type:String,
        required:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    video:{
        types:Schema.Types.ObjectId,
        ref:"video"
    }
},{timestamps: true})



export const comment=mongoose.model("comment",commentSchema)
commentSchema.plugin(mongooseAggregatePaginate)