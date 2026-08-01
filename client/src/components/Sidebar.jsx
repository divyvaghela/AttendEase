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
} from "react-icons/fa";

import "../styles/sidebar.css";


function Sidebar() {

  const navigate = useNavigate();


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };


  return (

    <div className="sidebar">


      <div className="logo">

        <h2>
          AttendEase
        </h2>

        <p>
          College ERP
        </p>

      </div>




      <ul className="menu">


        <li>

          <NavLink
            to="/dashboard"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaTachometerAlt />

            <span>
              Dashboard
            </span>

          </NavLink>

        </li>




        <li>

          <NavLink
            to="/students"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaUserGraduate />

            <span>
              Students
            </span>

          </NavLink>

        </li>




        <li>

          <NavLink
            to="/attendance"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaClipboardCheck />

            <span>
              Attendance
            </span>

          </NavLink>

        </li>




        <li>

          <NavLink
            to="/bulk-attendance"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaClipboardCheck />

            <span>
              Bulk Attendance
            </span>

          </NavLink>

        </li>





        <li>

          <NavLink
            to="/fees"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaMoneyBillWave />

            <span>
              Fees
            </span>

          </NavLink>

        </li>





        <li>

          <NavLink
            to="/holidays"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaCalendarAlt />

            <span>
              Holidays
            </span>

          </NavLink>

        </li>





        <li>

          <NavLink
            to="/reports"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaChartBar />

            <span>
              Reports
            </span>

          </NavLink>

        </li>





        <li>

          <NavLink
            to="/settings"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >

            <FaCog />

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

        <FaSignOutAlt />

        <span>
          Logout
        </span>

      </button>



    </div>

  );

}


export default Sidebar;