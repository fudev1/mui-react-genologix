import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialise l'état avec les données de l'utilisateur stockées dans localStorage ou avec des valeurs par défaut
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem("authData");
    return storedData ? JSON.parse(storedData) : { token: null, user: {} };
  });

  // Met à jour le localStorage chaque fois que `authData` est mis à jour
  useEffect(() => {
    localStorage.setItem("authData", JSON.stringify(authData));
  }, [authData]);

  // Met à jour les données de l'user dans le contexte et le localStorage
  const loginUser = (userData) => {
    const newAuthData = {
      token: userData.access,
      user: {
        email: userData.email,
        firstName: userData.first_name,
        lastName: userData.last_name,
        birthDate: userData.birth_date,
        sex: userData.sex,
        age: userData.age,

        // Inclure d'autres données de profil si nécessaire
      },
    };
    setAuthData(newAuthData);
  };

  // Fonction pour déconnecter l'utilisateur
  const logoutUser = () => {
    setAuthData({ token: null, user: {} });
    localStorage.removeItem("authData");
  };

  // Fournit les données d'authentification et la fonction de mise à jour à travers le contexte
  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, logoutUser, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// TOKEN (Résoudre le soucis de F5)
// `useEffect` vérifie si un token existe dans le stockage local au démarrage de l'application
// SI c'est le cas, il met à jour l'état d'authentification
