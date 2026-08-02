import { useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

import "../styles/manageUsers.css";


function ManageUsers(){


    const initialForm = {

        name:"",
        email:"",
        password:"",
        role:"Teacher",

        permissions:{

            viewStudents:false,
            addStudent:false,
            deleteStudent:false,
            attendance:false,
            fees:false,
            reports:false,
            settings:false

        }

    };



    const [form,setForm] = useState(initialForm);

    const [loading,setLoading] = useState(false);







    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };









    const handlePermission=(e)=>{


        setForm({

            ...form,

            permissions:{


                ...form.permissions,


                [e.target.name]:e.target.checked


            }

        });


    };









    const createUser = async(e)=>{


        e.preventDefault();


        try{


            setLoading(true);



            const token = localStorage.getItem(
                "token"
            );



            const res = await api.post(

                "/auth/create-user",

                form,

                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }

            );




            alert(
                res.data.message
            );




            setForm({

                name:"",
                email:"",
                password:"",
                role:"Teacher",

                permissions:{

                    viewStudents:false,
                    addStudent:false,
                    deleteStudent:false,
                    attendance:false,
                    fees:false,
                    reports:false,
                    settings:false

                }

            });




        }
        catch(error){



            console.log(error);



            alert(

                error.response?.data?.message ||

                "User Creation Failed"

            );


        }
        finally{


            setLoading(false);


        }



    };









    const permissionNames={


        viewStudents:"View Students",

        addStudent:"Add Student",

        deleteStudent:"Delete Student",

        attendance:"Manage Attendance",

        fees:"Manage Fees",

        reports:"View Reports",

        settings:"Settings"


    };









    return(



        <Layout>



        <div className="manage-container">



            <h1>
                Manage Users 👥
            </h1>







            <form

            className="user-card"

            onSubmit={createUser}

            >








            <input

            type="text"

            name="name"

            placeholder="Full Name"

            value={form.name}

            onChange={handleChange}

            required

            />









            <input

            type="email"

            name="email"

            placeholder="Email Address"

            value={form.email}

            onChange={handleChange}

            required

            />









            <input

            type="password"

            name="password"

            placeholder="Password"

            value={form.password}

            onChange={handleChange}

            required

            />









            <select

            name="role"

            value={form.role}

            onChange={handleChange}

            >


                <option value="Teacher">

                    Teacher

                </option>



                <option value="Admin">

                    Admin

                </option>



            </select>









            <h3>
                Permissions
            </h3>








            <div className="permissions">


            {

            Object.keys(
                form.permissions
            )
            .map((key)=>(



                <label key={key}>


                    <input

                    type="checkbox"

                    name={key}

                    checked={
                        form.permissions[key]
                    }

                    onChange={handlePermission}

                    />



                    <span>

                    {
                        permissionNames[key]
                    }

                    </span>



                </label>



            ))

            }



            </div>









            <button

            type="submit"

            disabled={loading}

            >


            {

            loading

            ?

            "Creating..."

            :

            "Create User"

            }



            </button>








            </form>







        </div>






        </Layout>



    );



}


export default ManageUsers;