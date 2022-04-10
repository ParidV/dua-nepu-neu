import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";

//Import the pages

function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/">Home</Link>
        <Link to="/login">login</Link>
        <Link to="/profile">Home</Link>
        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="login" element={<Login />} />
          <Route exact path="profile" element={<h1>Profile</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
