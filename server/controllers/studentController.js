const Student = require("../models/Student");
const Attendance = require("../models/Attendance");


// Add Student
const addStudent = async (req, res) => {

    try {

        const student = await Student.create(req.body);

        res.status(201).json({
            success:true,
            message:"Student Added Successfully",
            student
        });


    } catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};




// Get Single Student
const getStudentById = async(req,res)=>{

    try{


        const student = await Student.findById(req.params.id);



        if(!student){

            return res.status(404).json({

                success:false,

                message:"Student not found"

            });

        }



        const total = await Attendance.countDocuments({

            student:student._id

        });



        const present = await Attendance.countDocuments({

            student:student._id,

            status:"Present"

        });



        const absent = await Attendance.countDocuments({

            student:student._id,

            status:"Absent"

        });



        let percentage = 0;


        if(total>0){

            percentage =
            ((present/total)*100).toFixed(2);

        }



        res.json({

            success:true,

            student,

            attendance:{

                total,

                present,

                absent,

                percentage:percentage+"%"

            }

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};






// Get All Students
const getStudents = async(req,res)=>{

    try{


        const students = await Student.find();



        const studentData = await Promise.all(

            students.map(async(student)=>{


                const total =
                await Attendance.countDocuments({

                    student:student._id

                });



                const present =
                await Attendance.countDocuments({

                    student:student._id,

                    status:"Present"

                });



                const absent =
                await Attendance.countDocuments({

                    student:student._id,

                    status:"Absent"

                });



                let percentage = 0;


                if(total>0){

                    percentage =
                    ((present/total)*100).toFixed(2);

                }




                return {

                    ...student._doc,


                    attendance:{


                        total,

                        present,

                        absent,

                        percentage:
                        percentage+"%"


                    }


                };


            })

        );




        res.json({

            success:true,

            students:studentData

        });



    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};






// Update Student
const updateStudent = async(req,res)=>{

    try{


        const student =
        await Student.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true
            }

        );



        if(!student){

            return res.status(404).json({

                success:false,

                message:"Student not found"

            });

        }



        res.json({

            success:true,

            message:"Student Updated Successfully",

            student

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};






// Delete Student
const deleteStudent = async(req,res)=>{

    try{


        const student =
        await Student.findByIdAndDelete(req.params.id);



        if(!student){

            return res.status(404).json({

                success:false,

                message:"Student not found"

            });

        }



        res.json({

            success:true,

            message:"Student Deleted Successfully"

        });



    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


};





module.exports = {

    addStudent,

    getStudents,

    getStudentById,

    updateStudent,

    deleteStudent

};