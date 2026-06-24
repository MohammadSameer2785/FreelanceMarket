import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FreelancerProfile from "./pages/FreelancerProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/freelancer-profile" element={<FreelancerProfile />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
