import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import ViewTask from './components/ViewTask';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ViewTask />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App
