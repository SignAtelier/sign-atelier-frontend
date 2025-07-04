import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import SignatureList from "./pages/SignatureList";
import SignatureResult from "./pages/SignatureResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signature/result" element={<SignatureResult />} />
        <Route path="/signature/list" element={<SignatureList />} />
        <Route path="/signature/practice" element={<Practice />} />
      </Routes>
    </Router>
  );
}

export default App;
