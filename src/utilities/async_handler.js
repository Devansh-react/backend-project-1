const asynchandeler =(reqhandler)=>{
    (req,res,next)=>{
        Promise.resolve(reqhandler(req,res,next)).catch((err)=> next(err))

    }
}


const asynchandeler1 =(fn)=>{async(req, res, next)=>{
    try {
        await fn(req,res,next)
    } catch (error) {
        res.status(err.code||500).jason({
            success:false,
            message:err.message
        })
    }
}}

