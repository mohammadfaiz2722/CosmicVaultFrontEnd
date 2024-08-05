// import './App.css';
import ContactSection from './components/ContactSection';
import ForgotPassword from './components/ForgotPassword';
import GallerySection from './components/GallerySection';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProfileSection from './components/ProfileSection';
import ResetPassword from './components/ResetPassword';
import SignUp from './components/SignUp';
import UploadSection from './components/UploadSection';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OTPVerification from './components/VerifyOtp';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

import { useEffect } from 'react';
function App() {
  useEffect(() => {
    document.title = "Cosmic Vault";
  }, []);
  return (
   <>
   {/* <UploadSection/> */}
   <Router>
   <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/uploadsection" element={<UploadSection/>} />
        <Route path="/contactsection" element={<ContactSection/>} />
        <Route path="/profilesection" element={<ProfileSection/>} />
        <Route path="/gallerysection" element={<GallerySection/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgotpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword" element={<ResetPassword/>} />
        <Route path="/verifyotp" element={<OTPVerification/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </Router>
   </>
  );
}

export default App;
