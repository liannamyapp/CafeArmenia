import { Routes, Route } from "react-router-dom";
import "./App.scss";
import HeaderSection from "./components/HeaderSection";
import HeroSection from "./components/HeroSection";
import AdminAuth from "./AdminAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 
  return (
    <div className="App">
      {/* Public layout */}
      <ToastContainer position="top-right" autoClose={2500} />
        <>
          <HeaderSection />
          <HeroSection />
        
      
        </>
   
      <Routes>
        {/* Admin Auth */}
        <Route path="/admin" element={<AdminAuth />} />

       
      </Routes>
   
    </div>
  );
}

export default App;
