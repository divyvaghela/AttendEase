import { useState } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import "../styles/layout.css";


function Layout({ children }) {


    const [sidebarOpen, setSidebarOpen] = useState(false);



    return (

        <div className="layout-container">



            <Sidebar

                sidebarOpen={sidebarOpen}

                setSidebarOpen={setSidebarOpen}

            />





            {
                sidebarOpen &&

                <div

                    className="overlay"

                    onClick={()=>setSidebarOpen(false)}

                >

                </div>

            }





            <div className="content-area">



                <Navbar

                    setSidebarOpen={setSidebarOpen}

                />





                <main className="main-content">


                    {children}


                </main>



            </div>




        </div>

    );


}


export default Layout;