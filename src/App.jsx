import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuComponent from "./components/MenuComponent.jsx";
import HomeComponent from "./components/HomeComponent.jsx";
import PermissionTypesComponent from "./components/PermissionTypesComponent.jsx";
function App() {
    return (
        <Router>
            <MenuComponent />
            <Routes>
                <Route path="/" element={<HomeComponent />} /> {}
                <Route path="/permissions-type" element={<PermissionTypesComponent />} /> {}
            </Routes>
        </Router>
    );
}

export default App;