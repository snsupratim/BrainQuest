// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/about/About";
import Announcements from "./pages/announcements/Announcements";
import Contact from "./pages/contact/Contact";
// import Gallery from "./pages/gallery/Gallery";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Students from "./pages/students/Students";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Signin from "./pages/signin/Signin";
// import Signup from "./pages/signup/Signup";
import Room from "./pages/Rooms/Room";
import AuthPage from "./pages/auth/AuthPage";
import { RecoilRoot } from "recoil";
// import Timed from "./pages/Timed/Timed";
// import Endpage from "./pages/Endpage/Endpage";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="about" element={<About />} />
          {/* <Route path="gallery" element={<Gallery />} /> */}
          <Route path="announcements" element={<Announcements />} />
          <Route path="students" element={<Students />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} /> */}
          {/* <Route path="end" element={<Endpage />} />  */}
          <Route path="room" element={<Room />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
