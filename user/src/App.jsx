import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./Components/Navbar";
import Fileupload from "./Pages/FIleupload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import DashboardHome from "./Pages/DashboardHome";

function App() {
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  // console.log(GOOGLE_CLIENT_ID)

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Router>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Fileupload />} />
          <Route path="/dashboard" element={<DashboardHome />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
