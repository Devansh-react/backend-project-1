import { Router } from "express";
import { loginUser, registeruser, logoutuser , RefreshAccToken } from "../controller/user.controller.js";
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

route.route("/refresh-Accesstoken").post(RefreshAccToken)
export default route;