import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

import "../styles/fees.css";


function Fees(){


    const [students,setStudents] = useState([]);

    const [fees,setFees] = useState([]);

    const [paymentDate,setPaymentDate] = useState("");
    const [feeStatus,setFeeStatus] = useState([]);



    // ================= GET STUDENTS =================

    const getStudents = async()=>{

        try{

            const res = await api.get("/students");

            setStudents(
                res.data.students || []
            );


        }
        catch(error){

            console.log(error);

        }

    };






    // ================= GET FEES =================


    const getFees = async()=>{

        try{


            const res = await api.get("/fees");


            setFees(
                res.data.fees || []
            );


        }
        catch(error){

            console.log(error);

        }


    };






    useEffect(()=>{


        getStudents();

getFees();
getFeeStatus();



    },[]);







const getFeeStatus = async()=>{

    try{

        const res =
        await api.get("/fees/status");


        console.log(
            "FEE STATUS API:",
            res.data
        );


        setFeeStatus(
            res.data.students || []
        );


    }
    catch(error){

        console.log(error);

    }

};

    // ================= COLLECT FEE =================


    const collectFee = async(student)=>{


        if(!paymentDate){

            alert(
                "Select Payment Date"
            );

            return;

        }




        try{


            // const month = 
            // new Date(paymentDate)
            // .toLocaleString(
            //     "default",
            //     {
            //         month:"long",
            //         year:"numeric"
            //     }
            // );




await api.post(
    "/fees",
    {
        student: student._id,
        paymentDate
    }
);



            alert(
                "Fee Collected Successfully ✅"
            );



getFees();
getFeeStatus();


        }
catch(error){

    console.log("FEE ERROR:", error.response?.data);

    alert(
        error.response?.data?.message ||
        "Fee Collection Failed"
    );

}


    };


const checkStudentStatus = (studentId)=>{


    const data = feeStatus.find(

        (item)=>
        item.studentId === studentId

    );


    if(data){

        return {

            status:data.status,

            color:
            data.status === "Paid"
            ?
            "green"
            :
            "red"

        };

    }


    return {

        status:"Pending",

        color:"red"

    };


};

const printReceipt = (fee) => {

    const receipt = `
    <html>

    <head>

    <title>Fee Receipt</title>

    <style>

    body{

        font-family:Arial;

        padding:30px;

    }

    h2{

        text-align:center;

    }

    table{

        width:100%;

        border-collapse:collapse;

        margin-top:20px;

    }

    td{

        border:1px solid #000;

        padding:10px;

    }

    .footer{

        margin-top:60px;

        text-align:right;

    }

    </style>

    </head>

    <body>

    <h2>
    Shree Home Tuition Classes
    </h2>

    <h3 style="text-align:center;">
    Fee Receipt
    </h3>

    <table>

    <tr>

    <td>
    Receipt No
    </td>

    <td>
    ${fee.receiptNo}
    </td>

    </tr>

    <tr>

    <td>
    Student
    </td>

    <td>
    ${fee.student?.name}
    </td>

    </tr>

    <tr>

    <td>
    Roll No
    </td>

    <td>
    ${fee.student?.rollNo}
    </td>

    </tr>

    <tr>

    <td>
    Course
    </td>

    <td>
    ${fee.student?.course}
    </td>

    </tr>

    <tr>

    <td>
    Month
    </td>

    <td>
    ${fee.month}
    </td>

    </tr>

    <tr>

    <td>
    Amount
    </td>

    <td>
    ₹ ${fee.amount}
    </td>

    </tr>

    <tr>

    <td>
    Payment Date
    </td>

    <td>
    ${new Date(fee.paymentDate).toLocaleDateString()}
    </td>

    </tr>

    <tr>

    <td>
    Status
    </td>

    <td>
    ${fee.status}
    </td>

    </tr>

    </table>

    <div class="footer">

    Authorized Signature

    <br><br>

    ___________________

    </div>

    </body>

    </html>
    `;

    const win = window.open("", "_blank");

    win.document.write(receipt);

    win.document.close();

    win.print();

};



return(


<Layout>


<div className="fees-page">


<h1>
    Fees Management 💰
</h1>






<div className="fee-date">


<label>

Payment Date:

</label>


<input

type="date"

value={paymentDate}

onChange={(e)=>
setPaymentDate(e.target.value)
}

/>


</div>







<h2>
Students
</h2>




<div className="fee-grid">



{
students.map((student) => {

    const status = checkStudentStatus(student._id);

    return (

        <div
            className="fee-card"
            key={student._id}
        >

            <h3>{student.name}</h3>

            <p>
                Roll No: {student.rollNo}
            </p>

            <p>
                Monthly Fee:
                <b> ₹ {student.monthlyFee}</b>
            </p>

<p>
    Fee Status:
    <span
        className={
            status.status === "Paid"
                ? "paid"
                : status.status === "Pending"
                ? "pending"
                : "not-started"
        }
    >
        {status.status}
    </span>
</p>

            <button
                disabled={
                    student.monthlyFee <= 0 ||
                    status.status === "Paid"
                }
                onClick={() => collectFee(student)}
            >
                {
                    student.monthlyFee <= 0
                        ? "Set Fee First"
                        : status.status === "Paid"
                        ? "Already Paid"
                        : "Collect Fee"
                }
            </button>

        </div>

    );

})
}




</div>









<h2>
Fee History
</h2>





<table>


<thead>

<tr>
<th>Receipt</th>

<th>
Student
</th>


<th>
Month
</th>


<th>
Amount
</th>


<th>
Date
</th>


<th>
Status
</th>


</tr>

</thead>





<tbody>


{

fees.map((fee)=>(


<tr key={fee._id}>
<td>{fee.receiptNo || "-"}</td>    

<td>

{
fee.student?.name
}

</td>



<td>

{
fee.month
}

</td>


<td>

₹ {fee.amount}

</td>


<td>

{
new Date(
fee.paymentDate
)
.toLocaleDateString()

}

</td>


<td>

<span className="paid">
{fee.status}
</span>

<br/>

<button
onClick={()=>
window.open(
`/receipt/${fee._id}`,
"_blank"
)
}
>
View Receipt
</button>

</td>


</tr>


))


}



</tbody>


</table>






</div>


</Layout>


);


}


export default Fees;