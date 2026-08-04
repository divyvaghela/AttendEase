import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/students.css";


function Students(){

    const [students,setStudents] = useState([]);

    const [showForm,setShowForm] = useState(false);

    const [editId,setEditId] = useState(null);

    const [search,setSearch] = useState("");


    const initialForm = {

        name:"",
        rollNo:"",
        email:"",
        mobile:"",
        parentMobile:"",
        course:"",
        medium:"English",
        standard:"",
        semester:7,

        monthlyFee:"",
        feeStartDate:""

    };


    const [form,setForm] = useState(initialForm);



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




    useEffect(()=>{

        getStudents();

    },[]);





    // ================= INPUT CHANGE =================


    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };







    // ================= RESET FORM =================


    const resetForm=()=>{


        setForm(initialForm);

        setEditId(null);

        setShowForm(false);


    };








    // ================= ADD / UPDATE =================


    const addStudent=async(e)=>{


        e.preventDefault();


        try{


            if(editId){


                await api.put(

                    `/students/${editId}`,

                    form

                );


                alert(
                    "Student Updated Successfully"
                );


            }
            else{


                await api.post(

                    "/students",

                    form

                );


                alert(
                    "Student Added Successfully"
                );


            }



            resetForm();

            getStudents();


        }
        catch(error){


            alert(

                error.response?.data?.message ||

                "Operation Failed"

            );


        }


    };








    // ================= EDIT =================


    const editStudent=(student)=>{


        setEditId(student._id);


        setShowForm(true);



        setForm({

            name:student.name || "",

            rollNo:student.rollNo || "",

            email:student.email || "",

            mobile:student.mobile || "",

            parentMobile:
            student.parentMobile || "",

            course:
            student.course || "",


            medium:
            student.medium || "English",


            standard:
            student.standard || "",


            semester:
            student.semester || 7,


            monthlyFee:
            student.monthlyFee || "",


            feeStartDate:

            student.feeStartDate

            ?

            student.feeStartDate.substring(0,10)

            :

            ""

        });


    };








    // ================= DELETE =================


    const deleteStudent=async(id)=>{


        if(
            !window.confirm(
                "Delete this student?"
            )
        )

        return;



        try{


            await api.delete(

                `/students/${id}`

            );


            alert(
                "Student Deleted Successfully"
            );


            getStudents();


        }

        catch(error){

            console.log(error);

        }


    };








    // ================= SEARCH =================


    const filteredStudents = students.filter(

        (student)=>


        student.name
        ?.toLowerCase()
        .includes(
            search.toLowerCase()
        )

        ||

        student.rollNo
        ?.toLowerCase()
        .includes(
            search.toLowerCase()
        )


    );

    return(


<Layout>


<div className="students-page">



<div className="students-header">


<h1>
    Student Management 📚
</h1>



<button

onClick={()=>setShowForm(!showForm)}

>

{
showForm
?
"Close Form"
:
"+ Add Student"
}


</button>


</div>







{
showForm &&


<form

className="student-form"

onSubmit={addStudent}

>




<input

name="name"

placeholder="Student Name"

value={form.name}

onChange={handleChange}

required

/>






<input

name="rollNo"

placeholder="Roll No"

value={form.rollNo}

onChange={handleChange}

required

/>







<input

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

/>







<input

name="mobile"

placeholder="Student Mobile"

value={form.mobile}

onChange={handleChange}

required

/>







<input

name="parentMobile"

placeholder="Parent Mobile"

value={form.parentMobile}

onChange={handleChange}

required

/>







<input

name="course"

placeholder="Course"

value={form.course}

onChange={handleChange}

/>







<select

name="medium"

value={form.medium}

onChange={handleChange}

>


<option value="English">

English

</option>


<option value="Gujarati">

Gujarati

</option>


</select>








<input

name="standard"

placeholder="Standard"

value={form.standard}

onChange={handleChange}

required

/>









<input

type="number"

name="semester"

placeholder="Semester"

value={form.semester}

onChange={handleChange}

/>








{/* NEW FEES FIELDS */}



<input

type="number"

name="monthlyFee"

placeholder="Monthly Fee ₹"

value={form.monthlyFee}

onChange={handleChange}

required

/>








<input

type="date"

name="feeStartDate"

value={form.feeStartDate}

onChange={handleChange}

required

/>









<button type="submit">


{

editId

?

"Update Student"

:

"Save Student"

}


</button>






{
editId &&


<button

type="button"

onClick={resetForm}

>


Cancel


</button>


}




</form>


}






<input

className="student-search"

placeholder="Search Student / Roll No"

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

/>




<div className="student-grid">



{

filteredStudents.map((student)=>(


<div

className="student-card"

key={student._id}

>




<h2>

{student.name}

</h2>





<p>

Roll No:

<b>

{student.rollNo}

</b>

</p>





<p>

Course:

{student.course}

</p>





<p>

Medium:

{student.medium}

</p>





<p>

Standard:

{student.standard}

</p>





<p>

Semester:

{student.semester}

</p>





<hr/>






{/* FEES INFORMATION */}



<h3>

💰 Fees

</h3>




<p>

Monthly Fee:

<b>

₹ {student.monthlyFee || 0}

</b>

</p>





<p>

Fee Start Date:

{

student.feeStartDate

?

new Date(
student.feeStartDate
)
.toLocaleDateString()

:

"-"

}

</p>







<hr/>







<h3>

📅 Attendance

</h3>







<p>

Total Classes:

{

student.attendance?.total || 0

}

</p>







<p>

Present:

{

student.attendance?.present || 0

}

</p>







<p>

Attendance:

{

student.attendance?.percentage || "0%"

}

</p>









<div className="card-buttons">






<button

onClick={()=>editStudent(student)}

>

Edit

</button>









<button

className="delete"

onClick={()=>deleteStudent(student._id)}

>

Delete

</button>





</div>





</div>


))


}





</div>








</div>


</Layout>


);


}


export default Students;