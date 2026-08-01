const Fee = require("../models/Fee");



// Add Fee

const addFee = async(req,res)=>{

    try{


        const {
            student,
            totalFees,
            paidFees
        }=req.body;



        const pendingFees =
        totalFees - paidFees;



        let status="Pending";


        if(pendingFees===0)
        {
            status="Paid";
        }
        else if(paidFees>0)
        {
            status="Partial";
        }



        const fee = await Fee.create({

            student,

            totalFees,

            paidFees,

            pendingFees,

            status

        });



        res.status(201).json({

            success:true,

            message:"Fee Added Successfully",

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




// Get All Fees


const getFees = async(req,res)=>{


    try{


        const fees = await Fee.find()

        .populate(
            "student",
            "name rollNo course semester"
        );


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




// Update Fee


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




// Delete Fee


const deleteFee=async(req,res)=>{


try{


await Fee.findByIdAndDelete(req.params.id);



res.json({

success:true,

message:"Fee Deleted"

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

addFee,

getFees,

updateFee,

deleteFee

};