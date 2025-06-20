import Homepage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import { Toaster } from "@/components/ui/sonner";

function App() {
    return (
        <>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/dashboard" element={<Homepage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
