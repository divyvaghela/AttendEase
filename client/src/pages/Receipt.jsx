import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../styles/receipt.css";


function Receipt(){

    const { id } = useParams();

    const [fee,setFee] = useState(null);

const downloadPDF = async()=>{


    const element =
    document.getElementById(
        "receipt"
    );


    const canvas =
    await html2canvas(element);


    const imgData =
    canvas.toDataURL(
        "image/png"
    );


    const pdf =
    new jsPDF(
        "p",
        "mm",
        "a4"
    );


    const width =
    pdf.internal.pageSize.getWidth();


    const height =
    (
        canvas.height *
        width
    )
    /
    canvas.width;



    pdf.addImage(

        imgData,

        "PNG",

        0,

        0,

        width,

        height

    );


    pdf.save(

        `${fee.receiptNo}.pdf`

    );


};
    const getReceipt = async()=>{

        try{

            const res =
            await api.get(
                `/fees/receipt/${id}`
            );

            setFee(
                res.data.fee
            );

        }
        catch(error){

            console.log(error);

        }

    };


    useEffect(()=>{

        getReceipt();

    },[]);



    if(!fee){

        return <h2>Loading Receipt...</h2>;

    }



    return(

        <div className="receipt-container">


<div 
className="receipt-box"
id="receipt"
>

                <h1>
                    Shree Home Tuition Classes
                </h1>


                <p className="subtitle">
                    Quality Education Since 2026
                </p>


                <hr/>


                <h2>
                    FEE RECEIPT
                </h2>



                <div className="receipt-info">


                    <p>
                    <b>Receipt No:</b>
                    {fee.receiptNo}
                    </p>


                    <p>
                    <b>Date:</b>
                    {
                    new Date(
                        fee.paymentDate
                    )
                    .toLocaleDateString()
                    }
                    </p>


                </div>





                <table>


                <tbody>


                <tr>
                <td>
                Student Name
                </td>

                <td>
                {fee.student.name}
                </td>

                </tr>



                <tr>

                <td>
                Roll No
                </td>

                <td>
                {fee.student.rollNo}
                </td>

                </tr>




                <tr>

                <td>
                Course
                </td>

                <td>
                {fee.student.course}
                </td>

                </tr>




                <tr>

                <td>
                Month
                </td>

                <td>
                {fee.month}
                </td>

                </tr>




                <tr>

                <td>
                Amount
                </td>

                <td>
                ₹ {fee.amount}
                </td>

                </tr>




                <tr>

                <td>
                Status
                </td>

                <td>
                {fee.status}
                </td>

                </tr>


                </tbody>


                </table>




                <div className="signature">


                Authorized Signature

                <br/>

                _______________


                </div>




                <button
                onClick={()=>
                    window.print()
                }
                >

                🖨 Print Receipt

                </button>
<button
onClick={downloadPDF}
>
⬇ Download PDF
</button>


            </div>


        </div>

    );


}


export default Receipt;