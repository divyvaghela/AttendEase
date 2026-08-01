const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// ===========================
// Get All Student Fees
// ===========================

router.get("/", async(req,res)=>{

    try{

        const students = await Student.find()
        .select(
            "rollNo name course fees"
        );


        const feesData = students.map(student=>{


            return {

                id:student._id,

                rollNo:student.rollNo,

                name:student.name,

                course:student.course,


                total:
                student.fees?.total || 0,


                paid:
                student.fees?.paid || 0,


                pending:
                student.fees?.pending || 0,


                status:
                (student.fees?.pending || 0) === 0
                ?
                "Paid"
                :
                "Pending"


            };


        });



        res.json({

            success:true,

            fees:feesData

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }


});





// ===========================
// Update Fees
// ===========================

router.put("/:id", async(req,res)=>{


    try{


        const {

            total,

            paid

        } = req.body;



        const pending =
        Number(total)-Number(paid);



        const student = await Student.findByIdAndUpdate(

            req.params.id,


            {

                fees:{

                    total:Number(total),

                    paid:Number(paid),

                    pending:pending

                }

            },


            {
                new:true
            }


        );



        res.json({

            success:true,

            message:"Fees Updated Successfully",

            student

        });


    }
    catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


});





module.exports = router;