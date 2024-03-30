import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"

const userschema = new mongoose.Schema({
    user: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    Name: {
        type: String,
        lowercase: true,
        require: true,
        index: true
    },
    avatar: {
        type: String, //cloudnary url
        require: true,

    },
    coverimage: {
        type: String,

    },
    watchhistory: [
        {
            type: Schema.Type.objectID,
            ref: "video"
        }
    ], password: {
        type: String,
        require: [true, "password is require"]
    },
    refreshtoken: {
        type: string
    }

}, { timestamps: true })


userschema.pre("save", async function (next) {
    if (!this.modified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next();

})


userschema.methods.passwordcheck = async function (password) {
    return await bcrypt.compare(password, this.password)

}
userschema.methods.gernaterefreshtoken = function () {
    return jwt.sign(
        {
            id: this.id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIN: procress.env.REFRESH_TOKEN_EXPIRY

        }


    )
}
userschema.methods.gernateaccesstoken = function () {
    return jwt.sign(
        {
            id: this.id,
            user: this.user,
            email: this.email

        },
        process.env._ACCESS_TOKEN_SECRET,
        {
            expireIN: procress.env.ACCESS_TOKEN_EXPIRY

        }


    )
}

export const newuser = mongoose.model("Usermodel", userschema)