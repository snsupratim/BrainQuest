import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";

import Logout from "./components/Logout";
import adminAtom from "./atoms/adminAtom";

function App() {
  const admin = useRecoilValue(adminAtom);

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={admin ? <Home /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/auth"
            element={!admin ? <AuthPage /> : <Navigate to="/" />}
          ></Route>
        </Routes>

        {admin && <Logout />}
      </BrowserRouter>
    </>
  );
}

export default App;
