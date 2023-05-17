import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import "./css/style.css";
import Wrapper from "./Components/Wrapper";
import List from "./Components/Product/List";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Wrapper />}>
          <Route path="/" element={<List />} exact />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
