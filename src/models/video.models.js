import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videodets = new mongoose.Schema({
    videofile: {
        type: String,
        require: [true, "video is req."]

    },
    thuimbnail: {
        type: String,
        require: [true, "video is req."]

    },
    title: {
        type: String,
        require: [true, "video is req."]

    },
    description: {
        type: String,
        require: [true, "video is req."]

    },
    dursation: {
        type: number,//from cloudnary
        require: [true, "video is req."]

    },
    veiws: {
        type: number,
        default: 0,
    },
    ispublished: {
        type: Boolean,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: User,
        default: true,
    }



}, { timestamps: true })

videodets.plugin(mongooseAggregatePaginate)


export const video = mongoose.model("video", videodets)