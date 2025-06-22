import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Homepage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import FarmerDashboard from "./pages/Farmer-Dashboard";

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Homepage />} />
                    <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
