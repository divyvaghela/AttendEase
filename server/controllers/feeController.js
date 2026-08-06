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
// Check Monthly Fee Assigned

if(studentData.monthlyFee <= 0){

    return res.status(400).json({

        success:false,

        message:"Monthly fee not assigned to this student"

    });

}



        // Check already paid for same month

const startDate =
new Date(studentData.feeStartDate);


const payDate =
new Date(paymentDate);


// Calculate fee month

let feeMonth =
new Date(
    payDate.getFullYear(),
    payDate.getMonth(),
    1
);


// If payment is before fee date of month,
// consider previous month

if(
payDate.getDate() < startDate.getDate()
){

    feeMonth =
    new Date(
        payDate.getFullYear(),
        payDate.getMonth()-1,
        1
    );

}


const month =
feeMonth.toLocaleString(
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

// Get Student Fee Status Based On Fee Start Date

const getCurrentMonthFeeStatus = async(req,res)=>{

    try{


        const students = await Student.find();



        const today = new Date();



        const data = await Promise.all(

            students.map(async(student)=>{


                const startDate =
                new Date(student.feeStartDate);



                // Current month from today

                const currentMonth =
                new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    1
                );



                // Student fee not started yet

                if(startDate > currentMonth){


                    return {

                        studentId:student._id,

                        name:student.name,

                        rollNo:student.rollNo,

                        monthlyFee:student.monthlyFee,

                        status:"Not Started",

                        dueAmount:0,

                        month:"-"

                    };


                }




                const month =
                currentMonth.toLocaleString(
                    "default",
                    {
                        month:"long",
                        year:"numeric"
                    }
                );




                const fee =
                await Fee.findOne({

                    student:student._id,

                    month

                });





                return {


                    studentId:student._id,


                    name:student.name,


                    rollNo:student.rollNo,


                    monthlyFee:student.monthlyFee,



                    status:

                    fee

                    ?

                    "Paid"

                    :

                    "Pending",



                    dueAmount:

                    fee

                    ?

                    0

                    :

                    student.monthlyFee,



                    receiptNo:

                    fee?.receiptNo || null,



                    month



                };


            })

        );





        res.json({

            success:true,

            students:data

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
// Get Single Fee Receipt
// ===============================

const getFeeReceipt = async(req,res)=>{

    try{

        const fee = await Fee.findById(
            req.params.id
        )
        .populate(
            "student",
            "name rollNo course semester"
        );


        if(!fee){

            return res.status(404).json({

                success:false,
                message:"Receipt not found"

            });

        }


        res.json({

            success:true,
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



module.exports = {


    addFee,

    getFees,

    getStudentFees,

    updateFee,
    getCurrentMonthFeeStatus,
    getFeeReceipt,

    deleteFee


};