import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home..jsx";
import Audit from "./Pages/Audit.jsx";
import Results from "./Pages/Results.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;