import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

import "../styles/auth.css";


function Login(){


    const navigate = useNavigate();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [loading,setLoading] = useState(false);





    const handleLogin = async(e)=>{


        e.preventDefault();


        try{


            setLoading(true);



            const res = await api.post(

                "/auth/login",

                {
                    email,
                    password
                }

            );




            console.log("Login Response:", res.data);





            // Save Token

            localStorage.setItem(

                "token",

                res.data.token

            );







            // Save User Data

            const userData = {


                id: res.data.user._id,


                name: res.data.user.name,


                email: res.data.user.email,


                role: res.data.user.role,


                permissions:

                {

                    viewStudents:
                    res.data.user.permissions?.viewStudents || false,


                    addStudent:
                    res.data.user.permissions?.addStudent || false,


                    deleteStudent:
                    res.data.user.permissions?.deleteStudent || false,


                    attendance:
                    res.data.user.permissions?.attendance || false,


                    fees:
                    res.data.user.permissions?.fees || false,


                    reports:
                    res.data.user.permissions?.reports || false,


                    settings:
                    res.data.user.permissions?.settings || false,


                    holidays:
                    res.data.user.permissions?.holidays || false

                }


            };






            localStorage.setItem(

                "user",

                JSON.stringify(userData)

            );





            console.log(

                "Saved User:",

                JSON.parse(
                    localStorage.getItem("user")
                )

            );






            alert(
                "Login Successful"
            );



            navigate("/dashboard");




        }

        catch(error){


            console.log(

                "Login Error:",

                error

            );



            alert(

                error.response?.data?.message ||

                "Invalid Email or Password"

            );


        }


        finally{


            setLoading(false);


        }



    };









    return(


        <div className="auth-container">


            <form

            className="auth-card"

            onSubmit={handleLogin}

            >



                <h1>

                    AttendEase

                    <br/>

                    Login

                </h1>





                <input


                type="email"

                placeholder="Enter Email"


                value={email}


                onChange={(e)=>

                    setEmail(e.target.value)

                }


                required


                />







                <input


                type="password"

                placeholder="Enter Password"


                value={password}


                onChange={(e)=>

                    setPassword(e.target.value)

                }


                required


                />







                <button

                type="submit"

                disabled={loading}

                >


                    {

                    loading

                    ?

                    "Logging in..."

                    :

                    "Login"

                    }


                </button>





            </form>


        </div>


    );


}


export default Login;