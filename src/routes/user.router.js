import { Router } from "express";
import { loginUser, registeruser, logoutuser } from "../controller/user.controller.js";
import { upload } from "../middleware/multer.middleware.js"
import { verifyJWT } from "../middleware/auth.middleware.js";



const route = Router()

route.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1

        }, {
            name: "coverimage",
            maxCount: 1

        }
    ]),

    registeruser
)

route.route("/login").post(loginUser)

route.route("/logout").post(verifyJWT, logoutuser)
export default route;