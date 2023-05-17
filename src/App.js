import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./css/style.css";
import Wrapper from "./Components/Wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Wrapper />}>
          <Route path="/" element={<Dashboard />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
