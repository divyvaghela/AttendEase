import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

import {
  FaUserGraduate,
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

import "../styles/dashboard.css";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalAttendanceRecords: 0,
    presentToday: 0,
    absentToday: 0,
    averageAttendance: "0%",
    pendingFees: 0,
  });

  const [loading, setLoading] = useState(true);

  const getDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setDashboard({
        ...dashboard,
        ...res.data.dashboard,
      });
    } catch (error) {
      console.log(error);
      alert("Unable to load dashboard");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {

  getDashboard();

  const interval = setInterval(() => {
    getDashboard();
  }, 60000); // 1 minute

  return () => clearInterval(interval);

}, []);

  if (loading) {
    return (
      <Layout>
<div className="loader">
 Loading...
</div>      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
       

<div className="dashboard-header">

  <div>
    <h1>
      AttendEase Dashboard 🚀
    </h1>

    <p>
      Welcome back, Admin 👋
    </p>
  </div>


  <div className="today-date">
    📅 {new Date().toLocaleDateString()}
  </div>

</div>

        <div className="card-grid">

          <div className="card blue">
            <FaUserGraduate className="card-icon" />
            <h3>Total Students</h3>
            <h2>{dashboard.totalStudents}</h2>
          </div>

          <div className="card purple">
            <FaClipboardCheck className="card-icon" />
            <h3>Total Attendance</h3>
            <h2>{dashboard.totalAttendanceRecords}</h2>
          </div>

          <div className="card green">
            <FaCheckCircle className="card-icon" />
            <h3>Present Today</h3>
            <h2>{dashboard.presentToday}</h2>
          </div>

          <div className="card red">
            <FaTimesCircle className="card-icon" />
            <h3>Absent Today</h3>
            <h2>{dashboard.absentToday}</h2>
          </div>

        <div className="card orange attendance-card">

  <FaClipboardCheck className="card-icon" />

  <h3>Today's Attendance</h3>

<h2 className="percentage">
    {dashboard.averageAttendance}
</h2>
  <div className="attendance-detail">

    <p>
      🟢 Present:
      <b>
        {dashboard.presentToday}
      </b>
    </p>


    <p>
      🔴 Absent:
      <b>
        {dashboard.absentToday}
      </b>
    </p>

  </div>

</div>

        </div>

        {/* <div className="recent-box"> */}
<div className="table-wrapper">

          <h2>Recent Summary</h2>

          <table>

            <tbody>

              <tr>
                <td>Total Students</td>
                <td>{dashboard.totalStudents}</td>
              </tr>

              <tr>
                <td>Total Attendance Records</td>
                <td>{dashboard.totalAttendanceRecords}</td>
              </tr>

              <tr>
                <td>Present Today</td>
                <td>{dashboard.presentToday}</td>
              </tr>

              <tr>
                <td>Absent Today</td>
                <td>{dashboard.absentToday}</td>
              </tr>

              <tr>
                <td>Average Attendance</td>
                <td>{dashboard.averageAttendance}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </Layout>
  );
}

export default Dashboard;