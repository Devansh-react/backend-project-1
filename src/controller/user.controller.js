import asynchandeler from "../utilities/async_handler.js"
const registeruser = asynchandeler(async (req,res)=>{
    res.status(400).json({
        message:"ok"
    })
})
export  {registeruser}