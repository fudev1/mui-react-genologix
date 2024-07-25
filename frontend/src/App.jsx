import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Heart from "./pages/Heart";
import Lung from "./pages/Lung";
import Layout from "./layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute"; // Assure-toi que le chemin est correct
import { AuthProvider } from "./components/AuthContext"; // Importe AuthProvider

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes Privées */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index={true} element={<Home />} />
            <Route path="heart-predict" element={<Heart />} />
            <Route path="lung-predict" element={<Lung />} />
          </Route>
          {/* Routes Publiques */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
