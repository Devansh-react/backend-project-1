// this middlewqare will only verify weather the user is present or not

import {ApiError} from "../utilities/apiError.js"
import {asynchandeler} from "../utilities/async_handler.js";
import jwt from "jsonwebtoken";
import { newuser } from "../models/user.models.js";
import { ApiResponse } from "../utilities/apiResponse.js";

export const verifyJWT = asynchandeler(async (req, res, next) => {
    try {
        const requesttoken = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
        // In mobile apllication in place of cookies there are Headers that send authorization message 

        if (!requesttoken) {

           throw new ApiError (401,"unauthorize error")
        }

        const decodedtoken = jwt.verify(requesttoken, process.env.ACCESS_TOKEN_SECRET)
        const user = newuser.findById(decodedtoken?.id).select(" -password -refreshtoken")

        if (!user) {
            throw new console.error(401, "invalid access token")
        }

        req.user = user; /* ----> we injected user in the  middleware*/
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid token access")
    }

})

