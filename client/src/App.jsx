import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import BulkAttendance from "./pages/BulkAttendance";

// New Pages
import Fees from "./pages/Fees";
import Holidays from "./pages/Holidays";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Students */}
        <Route path="/students" element={<Students />} />

        {/* Attendance */}
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/bulk-attendance" element={<BulkAttendance />} />

        {/* Fees */}
        <Route path="/fees" element={<Fees />} />

        {/* Holidays */}
        <Route path="/holidays" element={<Holidays />} />

        {/* Reports */}
        <Route path="/reports" element={<Reports />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />


<Route
 path="/bulk-attendance"
 element={<BulkAttendance/>}
/>
      </Routes>

    </BrowserRouter>

  );

}

export default App;