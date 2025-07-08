import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AddTask from "./pages/AddTask/AddTask";
import ViewTask from "./pages/ViewTask/ViewTask";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage/LandingPage";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <MainLayout />
      <ToastContainer position="top-center"/>
    </Router>
  );
}

function MainLayout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // add more routes if needed

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <ViewTask />
            </PrivateRoute>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoute>
              <AddTask />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
