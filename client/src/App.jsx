import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfile from "./pages/UpdateProfile";
import Quest from "./pages/Quest";
import CreatePost from "./components/CreatePost";
import Profile from "./pages/Profile";
import RoomForm from "./pages/Room";
import Room from "./pages/Room";
import QuestionPage from "./pages/QuestionPage";

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth" />}
          ></Route> */}
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/about"
            element={user ? <About /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/room"
            element={user ? <Room /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/question"
            element={user ? <QuestionPage /> : <Navigate to="/auth" />}
          ></Route>
          <Route
            path="/update"
            element={user ? <UpdateProfile /> : <Navigate to="/auth" />}
          ></Route>

          <Route
            path="/quest"
            element={user ? <Quest /> : <Navigate to="/auth" />}
          ></Route>
        </Routes>

        {/* {user && <CreatePost />} */}
      </BrowserRouter>
    </>
  );
}

export default App;
