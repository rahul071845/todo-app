import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end>All Tasks</NavLink>
      <NavLink to="/add" end>Add Task</NavLink>
    </nav>
  );
}

export default Navbar;