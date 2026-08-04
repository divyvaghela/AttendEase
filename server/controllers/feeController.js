const Fee = require("../models/Fee");
const Student = require("../models/Student");



// ===============================
// Collect Fee
// ===============================

const addFee = async(req,res)=>{

    try{


        const {
            student,
            paymentDate
        } = req.body;



        // Find Student

        const studentData =
        await Student.findById(student);



        if(!studentData){

            return res.status(404).json({

                success:false,

                message:"Student not found"

            });

        }




        // Check already paid for same month

        const month =
        new Date(paymentDate)
        .toLocaleString(
            "default",
            {
                month:"long",
                year:"numeric"
            }
        );



        const existingFee =
        await Fee.findOne({

            student,

            month

        });



        if(existingFee){

            return res.status(400).json({

                success:false,

                message:"Fee already collected for this month"

            });

        }




        // Create Receipt Number

        const receiptNo =
        "REC-" + Date.now();





        const fee = await Fee.create({


            student,


            month,


            amount:
            studentData.monthlyFee,


            paymentDate,


            status:"Paid",


            receiptNo


        });






        res.status(201).json({

            success:true,

            message:"Fee Collected Successfully ✅",

            fee

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
// Get All Fees
// ===============================


const getFees = async(req,res)=>{


    try{


        const fees = await Fee.find()

        .populate(

            "student",

            "name rollNo parentMobile course semester monthlyFee"

        )

        .sort({

            createdAt:-1

        });




        res.json({

            success:true,

            fees

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
// Get Student Fees
// ===============================


const getStudentFees = async(req,res)=>{


    try{


        const fees = await Fee.find({

            student:req.params.studentId

        })

        .populate(

            "student",

            "name rollNo"

        )

        .sort({

            paymentDate:-1

        });




        res.json({

            success:true,

            fees

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
// Update Fee
// ===============================


const updateFee = async(req,res)=>{


    try{


        const fee =
        await Fee.findByIdAndUpdate(


            req.params.id,


            req.body,


            {
                new:true
            }


        );



        if(!fee){


            return res.status(404).json({

                success:false,

                message:"Fee record not found"

            });


        }




        res.json({

            success:true,

            message:"Fee Updated Successfully",

            fee

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
// Delete Fee
// ===============================


const deleteFee = async(req,res)=>{


    try{


        const fee =
        await Fee.findByIdAndDelete(

            req.params.id

        );



        if(!fee){


            return res.status(404).json({

                success:false,

                message:"Fee not found"

            });


        }




        res.json({

            success:true,

            message:"Fee Deleted Successfully"

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


    addFee,

    getFees,

    getStudentFees,

    updateFee,

    deleteFee


};