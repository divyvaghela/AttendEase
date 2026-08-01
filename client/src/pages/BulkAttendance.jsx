import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/bulkAttendance.css";


function BulkAttendance(){


const [attendance,setAttendance]=useState([]);



const [date,setDate]=useState(
    new Date().toISOString().split("T")[0]
);




// Get Students

const getStudents=async()=>{

try{


const res=await api.get("/students");


const data=res.data.students.map((student)=>({

    student:student._id,

    rollNo:student.rollNo,

    name:student.name,

    status:"Present"


}));


setAttendance(data);


}

catch(error){

console.log(error);

}


};





useEffect(()=>{

getStudents();

},[]);





// Change Status

const changeStatus=(id)=>{


setAttendance(

attendance.map((item)=>{


if(item.student===id)

{

return {

...item,

status:
item.status==="Present"
?
"Absent"
:
"Present"

};

}


return item;


})

);


};






// All Present

const allPresent=()=>{


setAttendance(

attendance.map((item)=>(

{

...item,

status:"Present"

}

))

);


};





// All Absent

const allAbsent=()=>{


setAttendance(

attendance.map((item)=>(

{

...item,

status:"Absent"

}

))

);


};








// Submit


const submitAttendance=async()=>{


try{


const data={


date,


attendance:

attendance.map((item)=>(

{

student:item.student,

status:item.status

}

))


};





const res=await api.post(

"/attendance/bulk",

data

);



alert(res.data.message);



}

catch(error){


console.log(error);


alert(
error.response?.data?.message ||
"Attendance Failed"
);


}


};







return(

<Layout>


<div className="bulk-container">


<h1>
Bulk Attendance 📅
</h1>



<div className="filters">


<input

type="date"

value={date}

onChange={(e)=>setDate(e.target.value)}

/>


</div>





<div className="action-buttons">


<button

className="present-btn"

onClick={allPresent}

>

All Present 🟢

</button>



<button

className="absent-btn"

onClick={allAbsent}

>

All Absent 🔴

</button>


</div>








<table>


<thead>

<tr>

<th>
Roll No
</th>

<th>
Name
</th>


<th>
Status
</th>


</tr>

</thead>





<tbody>


{

attendance.map((student)=>(


<tr key={student.student}>


<td>

{student.rollNo}

</td>



<td>

{student.name}

</td>




<td>


<button

className={

student.status==="Present"

?

"present"

:

"absent"

}


onClick={()=>changeStatus(student.student)}

>


{student.status}


</button>



</td>



</tr>



))


}



</tbody>



</table>






<button

className="submit-btn"

onClick={submitAttendance}

>

Submit Attendance 💾

</button>




</div>


</Layout>

);


}


export default BulkAttendance;