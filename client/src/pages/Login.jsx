import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleLogin = async(e)=>{

        e.preventDefault();

        try{

            const res = await api.post("/auth/login",{
                email,
                password
            });


            localStorage.setItem(
                "token",
                res.data.token
            );


            alert("Login Successful");

            navigate("/dashboard");


        }catch(error){

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );

        }

    };


    return(

        <div>

            <h1>AttendEase Login</h1>


            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <br/>


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <br/>


                <button type="submit">
                    Login
                </button>


            </form>


            <button onClick={()=>navigate("/register")}>
                Create Account
            </button>


        </div>

    );

}


export default Login;