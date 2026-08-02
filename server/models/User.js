const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(

{

    name: {

        type: String,

        required: true,

        trim: true

    },



    email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true

    },



    password: {

        type: String,

        required: true

    },



    role: {

        type: String,

        enum: [

            "Admin",

            "Teacher"

        ],

        default: "Teacher"

    },





    permissions: {


        viewStudents: {

            type: Boolean,

            default: false

        },



        addStudent: {

            type: Boolean,

            default: false

        },



        deleteStudent: {

            type: Boolean,

            default: false

        },



        attendance: {

            type: Boolean,

            default: false

        },



        fees: {

            type: Boolean,

            default: false

        },



        reports: {

            type: Boolean,

            default: false

        },



        settings: {

            type: Boolean,

            default: false

        },



        holidays: {

            type: Boolean,

            default: false

        }


    }


},


{

    timestamps:true

}


);



module.exports = mongoose.model(
    "User",
    userSchema
);