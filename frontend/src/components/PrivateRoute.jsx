import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
  const { authData } = useContext(AuthContext);

  if (!authData.token) {
    // Vérifie si le token est présent dans authData
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

// PrivateRoute vérifie si `authData` et `authData.token` sont présent
// dans le contexte `AuthContext`. Si l'utilisateur est authentifié (= Si le token est présent)
// alors le composant `children` est renvoyé. Sinon, l'utilisateur est redirigé vers la page d'accueil
