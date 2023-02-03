const mongoose = require('mongoose');

const userData = mongoose.Schema({
   
    email: {
        type: String,
         required: true,
          unique: true
        },
    password: {
        type: String, 
        required: true
    },
    deposits: {
        type: [{
            amount: Number,
            balance:Number,
            time: String,
            transactionType:String,
        }],
        default : []
    },
    withdrawals: {
        type: [{
            amount: Number,
            balance:Number,
            transactionType: String,
            time: String
        }],
        default : []},
    transactions: {
        type: [{}],
        default : []
    },
    balance: {
        type: Number,
        default:0
    }
}, {timestamps: true})

const userModel = mongoose.model("userReg", userData)

module.exports = userModel