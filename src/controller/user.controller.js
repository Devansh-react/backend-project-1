import asynchandeler from "../utilities/async_handler.js"
import { ApiError } from "../utilities/apiError.js"
import { newuser } from "../models/user.models.js"
import { uploadOncloudinary } from "../utilities/cloudinary.js"
import { ApiResponse } from "../utilities/apiResponse.js"



const gernateAccessAndRefreshTdoken = async (userId) => {
    try {
        const user = await newuser.findById(userId)
        const accesstoken = user.gernateaccesstoken()
        const refreshtoken = user.gernaterefreshtoken()

        newuser.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })/*<-- validate before save here is that user dont have to enter password again nd again everytime we save refreshtoken or change it*/

        return { accesstoken, refreshtoken }

    } catch (error) {
        throw new error(500, "refresh or access token not generated successfully")

    }
}



const registeruser = asynchandeler(async (req, res) => {

    {//algo for user creation 
        //get data from frontend
        //validate that all the necessary entries has been filled in proper manner
        //check username or email id in database to see if it already exits or not 
        //check if the cover image and avatar is uploaded successfully
        //upload the images to cloudinary 
        // then create data object -- create in db
        //remove password and refresh token from response
        //register user successfully
        //return user
    }



    const { name, user, email, password } = req.body
    console.log("email:", email, "\n name ", name)


    if ([name, user, email, password].some((feild) => feild?.trim() === "")) {
        throw new ApiError(400, ` all feild is required`)

    }

    const exitedUser = await newuser.find({
        $or: [{ name }, { email }]
    })
    if (exitedUser) {
        throw new ApiError(409, "user already exited")

    }

    const avtarlocalpath = req.files?.avatar[0]?.path;
    // const coveriamgepath = req.files?.coverimage[0]?.path ;

    if (req.files && Array.isArray(req.files.coverimage) && req.files.coverimgcloud.length > 0) {
        const converimagepath = req.files.coverimage[0].path
    }


    if (!avtarlocalpath) {
        throw new ApiError(400, "avtar is required")
    }

    const avtarcloud = await uploadOncloudinary(avtarlocalpath);
    const coverimgcloud = await uploadOncloudinary(coveriamgepath);


    if (!avtarcloud) {
        throw new ApiError(400, "avtar is not uploaded to cloudinary")
    }

    const userdatabase = await newuser.create({
        name,
        avatar: avtarcloud.url,
        coverimage: coverimgcloud?.url || "",//<--- this will throw the error of property u 
        email,
        password,
        username: username.toLowerCase()
    })

    const User = newuser.findById(userdatabase._id).select(
        " -password  -refreshtoken"
    )

    if (!User) {
        throw new ApiError(500, "something went wrong while creating a user")
    }

    return res.status(200).json(
        new ApiResponse(200, User, " user successfully registered")
    )

})


const loginUser = asynchandeler(async (req, res) => {

    const { email, password, user } = req.body

    if (!user || email) {
        throw new ApiError(401, "Email or username is required")

    }
    const account = newuser.findOne({
        $or: [{ email, password }]
    })

    if (!(user || email )) {
        throw new ApiError(404, "user dosen't exist create account ")
    }

    const passwordValidity = await account.isPasswordCorrect(password);

    if (!passwordValidity) {
        throw new ApiError(401, "invalid credentials")

    }
    const { refreshtoken, accesstoken } = gernateAccessAndRefreshTdoken(account.id)


    const loggedinuser = await newuser.findById(account.id).select(" -password -refreshtoken") /*<---- to remove trhe password and refreshtoken from sending it to user*/

    const options = {
        httpsOnly: true,
        secrure: true
    }/*<---this way cookies stored are only access by the database only rather than user*/

    .status(200).cookie("accesstoken", accesstoken, options)
    .cookie("refreshtoken", refreshtoken, options)
    .jason(

        new ApiResponse(
            200,

            {
                account: loggedinuser, accesstoken, refreshtoken
            },

            "user loggedin succesfully"
        )
    )
    return res;
})

    const logoutuser=asynchandeler(async(req,res)=>{

        newuser.findOneAndUpdate(
            req.user.id,
            {
                $set:{
                    refreshtoken:undefined
                }
            },
            {
                new:true
            }
        )
        const options = {
            httpsOnly: true,
            secrure: true
        }
        return res
        .status(200)
        .clearcookie("accesstoken",options)
        .clearcookie("refreshtoken",options)
        .json(new ApiResponse(200,"user logout successfully"))

    })

export { registeruser, loginUser, logoutuser }