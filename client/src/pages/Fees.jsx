import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";
import "../styles/fees.css";


function Fees(){


    const [fees,setFees] = useState([]);


    const [editId,setEditId] = useState(null);



    const [form,setForm] = useState({

        total:0,

        paid:0

    });




    // Get Fees Data

    const getFees = async()=>{


        try{


            const res = await api.get("/fees");


            setFees(res.data.fees);



        }
        catch(error){


            console.log(error);


        }


    };





    useEffect(()=>{


        getFees();


    },[]);






    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };






    const editFees=(student)=>{


        setEditId(student.id);


        setForm({

            total:student.total,

            paid:student.paid


        });


    };







    const updateFees=async(e)=>{


        e.preventDefault();



        try{


            await api.put(

                `/fees/${editId}`,

                form

            );



            alert(
                "Fees Updated Successfully"
            );



            setEditId(null);



            setForm({

                total:0,

                paid:0

            });



            getFees();



        }
        catch(error){


            alert(

                error.response?.data?.message ||
                "Update Failed"

            );


        }


    };







    return(


        <Layout>


        <div className="fees-container">



            <h1>
                Fees Management 💰
            </h1>





            {

            editId &&


            <form 
            className="fees-form"
            onSubmit={updateFees}
            >


                <h2>
                    Update Fees
                </h2>



                <input

                type="number"

                name="total"

                placeholder="Total Fees"

                value={form.total}

                onChange={handleChange}

                />




                <input

                type="number"

                name="paid"

                placeholder="Paid Fees"

                value={form.paid}

                onChange={handleChange}

                />




                <button>

                    Save Fees

                </button>



                <button

                type="button"

                onClick={()=>setEditId(null)}

                >

                    Cancel

                </button>



            </form>


            }







            <table className="fees-table">



                <thead>


                    <tr>


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
                            Total Fees
                        </th>


                        <th>
                            Paid
                        </th>


                        <th>
                            Pending
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


                fees.map((student)=>(


                    <tr key={student.id}>


                        <td>
                            {student.rollNo}
                        </td>



                        <td>
                            {student.name}
                        </td>



                        <td>
                            {student.course}
                        </td>



                        <td>
                            ₹ {student.total}
                        </td>



                        <td>
                            ₹ {student.paid}
                        </td>




                        <td>
                            ₹ {student.pending}
                        </td>





                        <td>


                            <span

                            className={
                                student.status==="Paid"
                                ?
                                "paid"
                                :
                                "pending"
                            }

                            >

                            {
                                student.status
                            }


                            </span>


                        </td>





                        <td>


                            <button

                            onClick={
                                ()=>editFees(student)
                            }

                            >

                                Update

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