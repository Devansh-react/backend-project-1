import  router  from "express";
import { registeruser } from "../controller/user.controller.js";
 const route=router()

route.route("/register").post(registeruser)


 export default route;