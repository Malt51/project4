import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/indexHome";
import Login from "./pages/Login/indexLogin";
import Register from "./pages/Register/indexRegister";
import ProtectedPage from "./components/ProtectedPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedPage><Home /></ProtectedPage>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>










  );
}

export default App
