const Attendance = require("../models/Attendance");


// ===============================
// Mark Single Attendance
// ===============================
const markAttendance = async (req, res) => {

    try {

        const {
            student,
            date,
            lecture,
            course,
            semester,
            status,
            remarks
        } = req.body;


        const existing = await Attendance.findOne({
            student,
            date,
            lecture
        });


        if(existing){

            existing.status = status;
            existing.course = course;
            existing.semester = semester;
            existing.remarks = remarks || "";

            await existing.save();


            return res.json({

                success:true,
                message:"Attendance Updated Successfully",
                attendance:existing

            });

        }



        const attendance = await Attendance.create({

            student,
            date,
            lecture,
            course,
            semester,
            status,
            remarks: remarks || ""

        });



        res.status(201).json({

            success:true,
            message:"Attendance Marked Successfully",
            attendance

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// ===============================
// Bulk Attendance
// ===============================

const markBulkAttendance = async(req,res)=>{


    try{


        const {

            date,
            lecture,
            course,
            semester,
            attendance

        } = req.body;



        if(!attendance || attendance.length===0){

            return res.status(400).json({

                success:false,
                message:"Attendance data required"

            });

        }



        let result=[];



        for(let item of attendance){


            let record = await Attendance.findOne({

                student:item.student,
                date,
                lecture

            });



            if(record){


                record.status=item.status;
                record.course=course;
                record.semester=semester;


                await record.save();


            }
            else{


                record = await Attendance.create({

                    student:item.student,
                    date,
                    lecture,
                    course,
                    semester,
                    status:item.status

                });


            }



            result.push(record);


        }



        res.json({

            success:true,
            message:"Bulk Attendance Saved Successfully",
            attendance:result

        });


    }
    catch(error){


        res.status(500).json({

            success:false,
            message:error.message

        });

    }


};






// ===============================
// Get Attendance History
// ===============================

const getAttendance = async(req,res)=>{


    try{


        const attendance = await Attendance.find()

        .populate({

            path:"student",

            select:
            "name rollNo mobile parentMobile email course medium standard semester"

        })

        .sort({

            date:-1

        });



        res.json({

            success:true,

            attendance

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






// ===============================
// Attendance Percentage
// ===============================

const getAttendancePercentage = async(req,res)=>{


    try{


        const studentId=req.params.studentId;



        const total =
        await Attendance.countDocuments({

            student:studentId

        });



        const present =
        await Attendance.countDocuments({

            student:studentId,

            status:"Present"

        });



        const absent =
        await Attendance.countDocuments({

            student:studentId,

            status:"Absent"

        });



        let percentage=0;


        if(total>0){

            percentage =
            ((present/total)*100).toFixed(2);

        }



        res.json({

            success:true,

            totalClasses:total,

            present,

            absent,

            percentage:percentage+"%"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






// ===============================
// Delete Attendance
// ===============================

const deleteAttendance = async(req,res)=>{


    try{


        const attendance =
        await Attendance.findById(req.params.id);



        if(!attendance){

            return res.status(404).json({

                success:false,

                message:"Attendance not found"

            });

        }



        await attendance.deleteOne();



        res.json({

            success:true,

            message:"Attendance Deleted Successfully"

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






module.exports={

    markAttendance,

    markBulkAttendance,

    getAttendance,

    getAttendancePercentage,

    deleteAttendance

};