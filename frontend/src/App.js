import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./pages/Login";

//Import the pages

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<h1>Home Page</h1>} />
          <Route exact path="login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
