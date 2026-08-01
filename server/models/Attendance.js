const mongoose = require("mongoose");


const attendanceSchema = new mongoose.Schema(

{

    student: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Student",

        required: true

    },


    date: {

        type: Date,

        required: true

    },


    status: {

        type: String,

        enum: [
            "Present",
            "Absent"
        ],

        default: "Present"

    },


    remarks: {

        type: String,

        default: ""

    }

},

{

    timestamps: true

}

);



// One student one attendance per day

attendanceSchema.index(

    {
        student:1,
        date:1
    },

    {
        unique:true
    }

);



module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);