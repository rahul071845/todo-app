import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">All Tasks</Link>
      <Link to="/add">Add Task</Link>
    </nav>
  );
}

export default Navbar;