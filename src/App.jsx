import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from "./components/HomeComponent.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeComponent />} /> {}
            </Routes>
        </Router>
    );
}

export default App;