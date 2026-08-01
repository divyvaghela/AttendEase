const Student = require("../models/Student");
const Attendance = require("../models/Attendance");


// Dashboard Summary
const getDashboard = async (req,res)=>{

    try{

        const totalStudents = await Student.countDocuments();


        const totalAttendanceRecords = await Attendance.countDocuments();


        const today = new Date();
        today.setHours(0,0,0,0);


        const presentToday = await Attendance.countDocuments({
            date:{
                $gte: today
            },
            status:"Present"
        });


        const absentToday = await Attendance.countDocuments({
            date:{
                $gte: today
            },
            status:"Absent"
        });


        const presentCount = await Attendance.countDocuments({
            status:"Present"
        });


        const percentage = totalAttendanceRecords === 0
            ? 0
            : ((presentCount / totalAttendanceRecords) * 100).toFixed(2);



        res.json({
            success:true,
            dashboard:{
                totalStudents,
                totalAttendanceRecords,
                presentToday,
                absentToday,
                averageAttendance: percentage + "%"
            }
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};


module.exports = {
    getDashboard
};