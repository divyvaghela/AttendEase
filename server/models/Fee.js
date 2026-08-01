const mongoose = require("mongoose");


const feeSchema = new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },


    totalFees:{
        type:Number,
        required:true
    },


    paidFees:{
        type:Number,
        default:0
    },


    pendingFees:{
        type:Number,
        default:0
    },


    status:{
        type:String,
        enum:["Paid","Pending","Partial"],
        default:"Pending"
    }


},
{
    timestamps:true
});


module.exports = mongoose.model("Fee",feeSchema);