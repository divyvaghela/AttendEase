import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/attendance.css";


function Attendance(){

    const [attendance,setAttendance] = useState([]);

    const [search,setSearch] = useState("");

    const [loading,setLoading] = useState(true);



    // Get Attendance

    const getAttendance = async()=>{

        try{

            setLoading(true);

            const res = await api.get("/attendance");

            setAttendance(
                res.data.attendance || []
            );


        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };




    useEffect(()=>{

        getAttendance();

    },[]);





    // Delete Attendance

    const deleteAttendance = async(id)=>{


        const confirmDelete =
        window.confirm(
            "Delete this attendance record?"
        );


        if(!confirmDelete)
            return;



        try{


            await api.delete(
                `/attendance/${id}`
            );


            alert(
                "Attendance Deleted Successfully"
            );


            getAttendance();


        }
        catch(error){

            console.log(error);

        }


    };





    // Search Filter

    const filteredAttendance =
    attendance.filter((item)=>{


        const name =
        item.student?.name?.toLowerCase() || "";


        const roll =
        item.student?.rollNo?.toLowerCase() || "";


        const value =
        search.toLowerCase();



        return (

            name.includes(value) ||
            roll.includes(value)

        );


    });







    return(


        <Layout>


        <div className="attendance-container">


            <div className="attendance-header">


                <h1>
                    Attendance History 📅
                </h1>



                <button
                onClick={getAttendance}
                >
                    🔄 Refresh
                </button>


            </div>





            <input

            className="search-attendance"

            placeholder="Search Student / Roll No"

            value={search}

            onChange={(e)=>
                setSearch(e.target.value)
            }

            />






            {
                loading ?

                (

                    <h3>
                        Loading Attendance...
                    </h3>

                )

                :


                filteredAttendance.length===0 ?

                (

                    <h3>
                        No Attendance Found
                    </h3>

                )

                :

                (


                <table className="attendance-table">


                <thead>

                    <tr>


                        <th>
                            Date
                        </th>


                        <th>
                            Roll No
                        </th>


                        <th>
                            Student Name
                        </th>


                        <th>
                            Course
                        </th>


                        <th>
                            Semester
                        </th>


                        <th>
                            Status
                        </th>


                        <th>
                            Action
                        </th>


                    </tr>


                </thead>





                <tbody>


                {


                filteredAttendance.map((item)=>(



                    <tr key={item._id}>


                        <td>

                        {
                            new Date(
                                item.date
                            )
                            .toLocaleDateString()
                        }

                        </td>





                        <td>

                        {
                            item.student?.rollNo
                        }

                        </td>






                        <td>

                        <b>
                        {
                            item.student?.name
                        }
                        </b>

                        </td>






                        <td>

                        {
                            item.student?.course ||
                            item.course
                        }

                        </td>






                        <td>

                        {
                            item.student?.semester ||
                            item.semester
                        }

                        </td>






                        <td>


                        <span

                        className={
                            item.status==="Present"

                            ?

                            "present-status"

                            :

                            "absent-status"
                        }

                        >

                        {
                            item.status
                        }


                        </span>



                        </td>







                        <td>


                        <button

                        className="delete-btn"

                        onClick={()=>
                            deleteAttendance(item._id)
                        }

                        >

                        Delete

                        </button>


                        </td>





                    </tr>



                ))


                }



                </tbody>


                </table>


                )

            }




        </div>


        </Layout>


    );


}


export default Attendance;