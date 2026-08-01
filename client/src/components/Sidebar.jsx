import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaClipboardCheck,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes
} from "react-icons/fa";


import "../styles/sidebar.css";



function Sidebar({ sidebarOpen, setSidebarOpen }) {


    const navigate = useNavigate();



    const logout =()=>{


        localStorage.removeItem("token");

        navigate("/");


    };





    const closeSidebar=()=>{

        setSidebarOpen(false);

    };





    return(


        <>


        {
            sidebarOpen &&

            <div

            className="overlay"

            onClick={closeSidebar}

            ></div>

        }





        <div

        className={
            sidebarOpen
            ?
            "sidebar mobile-open"
            :
            "sidebar"
        }


        >





            <div className="mobile-close">


                <button

                onClick={closeSidebar}

                >

                    <FaTimes />

                </button>


            </div>






            <div className="logo">


                <h2>
                    Shree Home Tutuon Classes
                </h2>


                {/* <p>
                    Home Tutuon Class
                </p> */}


            </div>








            <ul className="menu">



                <li>

                <NavLink

                to="/dashboard"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaTachometerAlt/>

                <span>
                    Dashboard
                </span>


                </NavLink>

                </li>






                <li>

                <NavLink

                to="/students"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaUserGraduate/>

                <span>
                    Students
                </span>


                </NavLink>

                </li>








                <li>

                <NavLink

                to="/attendance"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaClipboardCheck/>

                <span>
                    Attendance
                </span>


                </NavLink>

                </li>







                <li>

                <NavLink

                to="/bulk-attendance"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaClipboardCheck/>

                <span>
                    Bulk Attendance
                </span>


                </NavLink>

                </li>







                <li>

                <NavLink

                to="/fees"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaMoneyBillWave/>

                <span>
                    Fees
                </span>


                </NavLink>

                </li>







                <li>

                <NavLink

                to="/holidays"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaCalendarAlt/>

                <span>
                    Holidays
                </span>


                </NavLink>

                </li>







                <li>

                <NavLink

                to="/reports"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaChartBar/>

                <span>
                    Reports
                </span>


                </NavLink>

                </li>







                <li>

                <NavLink

                to="/settings"

                onClick={closeSidebar}

                className={({isActive})=>

                    isActive ? "active" : ""

                }

                >

                <FaCog/>

                <span>
                    Settings
                </span>


                </NavLink>

                </li>





            </ul>








            <button

            className="logout-btn"

            onClick={logout}

            >

                <FaSignOutAlt/>


                <span>
                    Logout
                </span>


            </button>






        </div>


        </>


    );


}



export default Sidebar;