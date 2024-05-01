import 
{Schema,mongoose} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 280
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: null
    },
    video: {
        type: String,
        default: null
    },
    link: {
        type: String,
        default: null
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "tweet"
    }]
}, { timestamps: true })

tweetSchema.plugin(mongooseAggregatePaginate)

export const tweet = mongoose.model("tweet", tweetSchema)