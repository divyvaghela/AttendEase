function Register(){

    return(
        <h1>
            AttendEase Register Page
        </h1>
    );

}

export default Register;




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api/axios";

// import "../styles/auth.css";


// function Register(){

//     const navigate = useNavigate();


//     const [form,setForm] = useState({

//         name:"",
//         email:"",
//         password:""

//     });



//     const handleChange=(e)=>{

//         setForm({

//             ...form,

//             [e.target.name]:e.target.value

//         });

//     };





//     const register=async(e)=>{

//         e.preventDefault();


//         try{


//             const res = await api.post(

//                 "/auth/register",

//                 form

//             );


//             alert(
//                 res.data.message ||
//                 "Registration Successful"
//             );


//             navigate("/");


//         }
//         catch(error){


//             alert(

//                 error.response?.data?.message ||
//                 "Registration Failed"

//             );


//         }


//     };






//     return(


//         <div className="auth-container">


//             <form 
//             className="auth-card"
//             onSubmit={register}
//             >


//                 <h1>
//                     AttendEase Register
//                 </h1>




//                 <input

//                 type="text"

//                 name="name"

//                 placeholder="Full Name"

//                 value={form.name}

//                 onChange={handleChange}

//                 required

//                 />





//                 <input

//                 type="email"

//                 name="email"

//                 placeholder="Email"

//                 value={form.email}

//                 onChange={handleChange}

//                 required

//                 />






//                 <input

//                 type="password"

//                 name="password"

//                 placeholder="Password"

//                 value={form.password}

//                 onChange={handleChange}

//                 required

//                 />






//                 <button>

//                     Register

//                 </button>






//                 <p>

//                     Already have account?

//                     <span

//                     onClick={()=>navigate("/")}

//                     >

//                     Login

//                     </span>

//                 </p>



//             </form>



//         </div>


//     );

// }


// export default Register;    