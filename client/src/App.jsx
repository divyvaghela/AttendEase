import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import BulkAttendance from "./pages/BulkAttendance";
import Fees from "./pages/Fees";
import Holidays from "./pages/Holidays";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ManageUsers from "./pages/ManageUsers";
import NotFound from "./pages/NotFound";


// Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* PUBLIC ROUTE */}

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* DASHBOARD */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* STUDENTS */}

                <Route
                    path="/students"
                    element={
                        <ProtectedRoute permission="viewStudents">
                            <Students />
                        </ProtectedRoute>
                    }
                />

                {/* ATTENDANCE */}

                <Route
                    path="/attendance"
                    element={
                        <ProtectedRoute permission="attendance">
                            <Attendance />
                        </ProtectedRoute>
                    }
                />

                {/* BULK ATTENDANCE */}

                <Route
                    path="/bulk-attendance"
                    element={
                        <ProtectedRoute permission="attendance">
                            <BulkAttendance />
                        </ProtectedRoute>
                    }
                />

                {/* FEES */}

                <Route
                    path="/fees"
                    element={
                        <ProtectedRoute permission="fees">
                            <Fees />
                        </ProtectedRoute>
                    }
                />

                {/* HOLIDAYS */}

                <Route
                    path="/holidays"
                    element={
                        <ProtectedRoute permission="holidays">
                            <Holidays />
                        </ProtectedRoute>
                    }
                />

                {/* REPORTS */}

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute permission="reports">
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                {/* SETTINGS */}

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute permission="settings">
                            <Settings />
                        </ProtectedRoute>
                    }
                />

                {/* ADMIN ONLY */}

                <Route
                    path="/manage-users"
                    element={
                        <AdminRoute>
                            <ManageUsers />
                        </AdminRoute>
                    }
                />

                {/* 404 */}

                <Route
                    path="*"
                    element={<NotFound />}
                />

                <Route
path="/fees"
element={<Fees/>}
/>

            </Routes>

        </BrowserRouter>

    );

}

export default App;