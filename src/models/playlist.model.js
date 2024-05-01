import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "video"
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    },
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: "user"
    }


}, { timestamps: true })

export const playlist = mongoose.model("playlist", playlistSchema)