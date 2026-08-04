const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true
    },


    rollNo:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },


    email:{
        type:String,
        trim:true,
        lowercase:true
    },


    mobile:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    },


    parentMobile:{
        type:String,
        required:true,
        trim:true,
        minlength:10,
        maxlength:10
    },


    course:{
        type:String,
        required:true,
        trim:true
    },


    medium:{
        type:String,
        enum:[
            "English",
            "Gujarati"
        ],
        default:"English"
    },


    standard:{
        type:String,
        required:true,
        trim:true
    },


    semester:{
        type:Number,
        required:true,
        default:7
    },


    // Monthly fixed fees

    monthlyFee:{
        type:Number,
        required:true,
        default:0
    },


    // Student fee cycle start date

    feeStartDate:{
        type:Date,
        required:true,
        default:Date.now
    },


    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


},
{
    timestamps:true
});


module.exports = mongoose.model(
    "Student",
    studentSchema
);