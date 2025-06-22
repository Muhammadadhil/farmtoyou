import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Homepage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Homepage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
