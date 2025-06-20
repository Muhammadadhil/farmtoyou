import Homepage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/onboarding" element={<Onboarding />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
