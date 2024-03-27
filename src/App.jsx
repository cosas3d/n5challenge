import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuComponent from "./components/MenuComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
function App() {
    return (
        <Router>
            <MenuComponent />
            <Routes>
                <Route path="/" element={<HomeComponent />} /> {}
            </Routes>
        </Router>
    );
}

export default App;