import LandingPage from "./pages/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Homepage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import FarmerDashboard from "./pages/Farmer-Dashboard";
import { UserProvider } from "./context/UserContext";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <UserProvider>
            <Toaster />
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Homepage />} />
                        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
                    </Route>
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
