const express = require('express');
const { createUser, loginUser, depositUser, withdrawUser } = require('../controler/userController');
const { validateAuth } = require('../utils/jwt');

 const userRouter= express.Router()


 userRouter.post("/register",createUser)


 userRouter.post("/login", loginUser)

 userRouter.post("/deposit/:id", validateAuth , depositUser)

 
 userRouter.post("/withdraw/:id", validateAuth , withdrawUser)


module.exports = userRouter