const userModel = require("../models/user")

const asyncHandler = require("express-async-handler")
const expressAsyncHandler = require("express-async-handler")
const { createToken, tokenTime } = require("../utils/jwt")


const createUser = expressAsyncHandler(async( req , res ) => {
    try {
        const {email, password} = req.body

        const doesUserExist = await userModel.findOne({
            email
        })
        if(doesUserExist){
            throw new Error("User already exists ")
        }
        const newUser = await userModel.create({
            email, password
        })

        if (newUser){
            const {_id} = newUser
            const jwtGen = createToken({_id})

            res.cookie("user-login", jwtGen, {
                maxAge: tokenTime
            })
            res.status(201).json(newUser)
        }
    } catch (error) {
        throw new Error(error.message)
    }
})



const loginUser = expressAsyncHandler(async( req , res ) => {
    try {
        const {email, password} = req.body

        const doesEmailExist = await userModel.findOne({
            email
        })
        if(!doesEmailExist){
            throw new Error("email does not exist")
            
        }

       if( doesEmailExist.password === password){
        const {_id} = doesEmailExist

        const jwtGen = createToken({_id})

        res.cookie("user-login", jwtGen, {
            maxAge: tokenTime
        })
        res.status(200).json("user logged in successfully")
       } else{
        throw new Error("password does not match")
       }

      
    } catch (error) {
        throw new Error(error.message)
    }
})


const depositUser = expressAsyncHandler(async( req , res ) => {
    try {
        const {amount, balance} = req.body
        const {id} = req.params
        const time = Date.now()
        const transactionType = "deposit"

       const findUser = await userModel.findById(id)
       if(findUser){
         const newBalance= parseFloat(amount)  + parseFloat(findUser.balance)
        const data = {
            amount,
            newBalance,
            time,
            transactionType
        }
        console.log(findUser.deposits)
        findUser.deposits.push(data)
        findUser.balance = newBalance
        await findUser.save()
        res.status(200).json({
            message: "deposit successful",
            data: findUser
           })
       }else{
        res.status(501).json({
            message: "deposit not successful",
           })
       }
      
    } catch (error) {
        throw new Error(error.message)
    }
})

const withdrawUser = expressAsyncHandler(async( req , res ) => {
    try {
        const {amount} = req.body
        const {id} = req.params
        const time = Date.now()
        const transactionType = "deposit"

       const findUser = await userModel.findById(id)
       if(findUser){
       if(findUser.balance < amount){
        throw new Error("insufficient balance in account")
       }
         const newBalance= findUser.balance - amount
        const data = {
            amount,
            newBalance,
            time,
            transactionType
        }
        console.log(findUser.deposits)
        findUser.balance = newBalance
        findUser.withdrawal.push(data)
        
        await findUser.save()
        res.status(200).json({
            message: "withdrawal successful",
            data: findUser
           })
       }else{
        res.status(501).json({
            message: "witdrawal not successful",
           })
       }
      
    } catch (error) {
        throw new Error(error.message)
    }
})


module.exports = {createUser, loginUser, depositUser, withdrawUser}




