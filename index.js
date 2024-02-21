import express  from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './Routes/user.route.js'
import authRouter from './Routes/router.js'
import listingRouter from './Routes/listing.route.js'
import cookieParser from 'cookie-parser'
dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
        console.log("MongoDB Atlas connected succesfully with dreamHomeserver");
    }).catch((reason)=>{
        console.log(reason);
        console.log("MongoDB connection failed");
    })
    

const dhServer=express()
dhServer.use(express.json())
dhServer.use(cookieParser())

const PORT= 4000 || process.env.PORT

dhServer.listen(PORT,()=>{
    console.log(`DreamHome server started!!`);
})

dhServer.use("/api/user",userRouter)
dhServer.use("/api/auth",authRouter)
dhServer.use("/api/listing",listingRouter)

dhServer.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message|| 'internal server error'
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})