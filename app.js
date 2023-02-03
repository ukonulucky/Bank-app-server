const cookieParser = require('cookie-parser');
const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const dbConnection = require('./config/dbConnect');
require("dotenv").config()
const userRouter = require("./routes/userRoutes")

const app = express();

 app.use(express.json())
app.use(cookieParser())

 app.use('/api/', userRouter )

const port = process.env.PORT || 7000

const connectDbAndServer = async function (params) {
    try {
        const db = await dbConnection()
        if (db){
            app.listen(port, function () {
                console.log(`db connected and server running on port ${port}`)
            }
                
            
            )
        }
    } catch (error) {
        console.log(error.message)
    }
}
connectDbAndServer()