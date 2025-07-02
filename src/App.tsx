import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SignatureResult from "./pages/SignatureResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signature/result" element={<SignatureResult />} />
      </Routes>
    </Router>
  );
}

export default App;
