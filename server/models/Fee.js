const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    month:{
        type:String,
        required:true
    },

    paymentDate:{
        type:Date,
        default:Date.now
    },

    receiptNo:{
        type:String,
        unique:true
    },

    status:{
        type:String,
        default:"Paid"
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Fee",feeSchema);