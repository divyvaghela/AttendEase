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
    FaTimes,
    FaUsers
} from "react-icons/fa";

import "../styles/sidebar.css";


function Sidebar({ sidebarOpen, setSidebarOpen }) {


    const navigate = useNavigate();


    const user = JSON.parse(
        localStorage.getItem("user")
    ) || {};



    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };



    const closeSidebar = () => {

        setSidebarOpen(false);

    };



    // Permission checker

    const hasPermission = (permission) => {

        if(user.role === "Admin")
        {
            return true;
        }


        return user.permissions?.[permission] === true;

    };





    return (

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

                <button onClick={closeSidebar}>
                    <FaTimes/>
                </button>

            </div>





            <div className="logo">

                <h2>
                    Shree Home Tuition Classes
                </h2>

            </div>






            <ul className="menu">



                {/* Dashboard */}

                <li>

                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({isActive}) =>
                            isActive ? "active" : ""
                        }
                    >

                        <FaTachometerAlt/>

                        <span>
                            Dashboard
                        </span>


                    </NavLink>

                </li>









                {/* Students */}

                {
                    hasPermission("viewStudents") &&

                    <li>

                        <NavLink
                            to="/students"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaUserGraduate/>

                            <span>
                                Students
                            </span>


                        </NavLink>

                    </li>

                }









                {/* Attendance */}

                {
                    hasPermission("attendance") &&

                    <>


                    <li>

                        <NavLink
                            to="/attendance"
                            onClick={closeSidebar}
                            className={({isActive}) =>
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
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaClipboardCheck/>

                            <span>
                                Bulk Attendance
                            </span>


                        </NavLink>


                    </li>


                    </>

                }









                {/* Fees */}

                {
                    hasPermission("fees") &&

                    <li>

                        <NavLink
                            to="/fees"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaMoneyBillWave/>

                            <span>
                                Fees
                            </span>


                        </NavLink>


                    </li>
                }









                {/* Holidays */}

                {
                    hasPermission("holidays") &&

                    <li>

                        <NavLink
                            to="/holidays"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaCalendarAlt/>

                            <span>
                                Holidays
                            </span>


                        </NavLink>


                    </li>

                }









                {/* Reports */}

                {
                    hasPermission("reports") &&

                    <li>

                        <NavLink
                            to="/reports"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaChartBar/>

                            <span>
                                Reports
                            </span>


                        </NavLink>


                    </li>

                }









                {/* Settings */}

                {
                    hasPermission("settings") &&

                    <li>

                        <NavLink
                            to="/settings"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaCog/>

                            <span>
                                Settings
                            </span>


                        </NavLink>


                    </li>

                }









                {/* Admin Only */}

                {
                    user.role === "Admin" &&


                    <li>

                        <NavLink
                            to="/manage-users"
                            onClick={closeSidebar}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >

                            <FaUsers/>

                            <span>
                                Manage Users
                            </span>


                        </NavLink>


                    </li>

                }




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