import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import Logout from "./components/Logout";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>

        {user && <Logout />}
      </BrowserRouter>
    </>
  );
}

export default App;
