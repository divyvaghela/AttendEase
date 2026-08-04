import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

import "../styles/fees.css";


function Fees(){


    const [students,setStudents] = useState([]);

    const [fees,setFees] = useState([]);

    const [paymentDate,setPaymentDate] = useState("");




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


    },[]);









    // ================= COLLECT FEE =================


    const collectFee = async(student)=>{


        if(!paymentDate){

            alert(
                "Select Payment Date"
            );

            return;

        }




        try{


            const month = 
            new Date(paymentDate)
            .toLocaleString(
                "default",
                {
                    month:"long",
                    year:"numeric"
                }
            );




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



        }
catch(error){

    console.log("FEE ERROR:", error.response?.data);

    alert(
        error.response?.data?.message ||
        "Fee Collection Failed"
    );

}


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

students.map((student)=>(


<div

className="fee-card"

key={student._id}

>


<h3>

{student.name}

</h3>



<p>

Roll No:

{student.rollNo}

</p>



<p>

Monthly Fee:

<b>
₹ {student.monthlyFee}
</b>

</p>




<button

onClick={()=>
collectFee(student)
}

>

Collect Fee

</button>



</div>


))


}



</div>









<h2>
Fee History
</h2>





<table>


<thead>

<tr>

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

{
fee.status
}

</span>

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