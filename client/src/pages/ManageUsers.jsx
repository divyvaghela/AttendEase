import { useState, useEffect } from "react";
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

    const [users, setUsers] = useState([]);
const [editingId, setEditingId] = useState(null);





const handleChange=(e)=>{

    if(e.target.name==="role"){

        if(e.target.value==="Admin"){

            setForm({

                ...form,

                role:"Admin",

                permissions:{
                    viewStudents:true,
                    addStudent:true,
                    deleteStudent:true,
                    attendance:true,
                    fees:true,
                    reports:true,
                    settings:true
                }

            });

        }
        else{

            setForm({

                ...form,

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

    }

    else{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    }

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
            getUsers();






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

const getUsers = async () => {
    try {

        const token = localStorage.getItem("token");

        const res = await api.get("/auth/users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(res.data);

    } catch (error) {

        console.log(error);

    }
};


const editUser = (user) => {

    setEditingId(user._id);

    setForm({

        name:user.name,

        email:user.email,

        password:"",

        role:user.role,

        permissions:user.permissions

    });

};


const deleteUser = async(id)=>{

    if(!window.confirm("Delete this user?"))
        return;


    try{

        const token = localStorage.getItem("token");


 await api.delete(
    `/auth/delete-user/${id}`,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        alert("User Deleted Successfully");


        getUsers();


    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Delete Failed"
        );

    }

};


const updateUser = async(e)=>{

    e.preventDefault();


    try{

        const token = localStorage.getItem("token");


        const res = await api.put(

            `/auth/update-user/${editingId}`,

            form,

            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }

        );


        alert(res.data.message);


        setEditingId(null);


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

        getUsers();


    }
    catch(error){

        alert(
            error.response?.data?.message ||
            "Update Failed"
        );

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



useEffect(() => {
    getUsers();

}, []);





    return(



        <Layout>



        <div className="manage-container">



            <h1>
                Manage Users 👥
            </h1>







            <form

            className="user-card"

onSubmit={editingId ? updateUser : createUser}
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

required={!editingId}

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

checked={form.permissions[key]}

onChange={handlePermission}

disabled={form.role==="Admin"}

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
 editingId
 ? "Updating..."
 : "Creating..."
 :
 editingId
 ? "Update User"
 : "Create User"
}



            </button>





<div className="user-list">

    <h2>All Users</h2>

    <table>

        <thead>

            <tr>

                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>

            </tr>

        </thead>

        <tbody>

            {
                users.map((user) => (

                    <tr key={user._id}>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>{user.role}</td>

                        <td>

<button
    type="button"
    onClick={() => editUser(user)}
>
    Edit
</button>

       <button
    type="button"
    onClick={() => deleteUser(user._id)}
>
    Delete
</button>

                        </td>

                    </tr>

                ))
            }

        </tbody>

    </table>

</div>


            </form>







        </div>






        </Layout>



    );



}


export default ManageUsers;