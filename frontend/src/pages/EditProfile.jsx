import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditProfile = ({ isOpen, handleClose }) => {
  const { authData, setAuthData } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    // Initialise avec les données actuelles de l'utilisateur
    username: authData.username,
  });

  // Utiliser useEffect pour mettre à jour profileData lorsque le modal s'ouvre
  useEffect(() => {
    if (authData && isOpen) {
      setProfileData({
        username: authData.username,
        // Ajoute ici les autres propriétés si nécessaire
      });
    }
  }, [authData, isOpen]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8000/edit_profile/",
        profileData,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`, // Assure-toi d'envoyer le token d'authentification
          },
        }
      );
      if (response.status === 200) {
        setAuthData({ ...authData, ...response.data }); // Mise à jour des données d'authentification
        localStorage.setItem(
          "authData",
          JSON.stringify({ ...authData, ...response.data })
        );
        handleClose();
      } else {
        // Gérer les réponses autres que le succès
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
      // Gérer l'erreur, par exemple afficher un message d'erreur
    }
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Éditer le profil</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom d'utilisateur"
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleInputChange}
            fullWidth
          />
          {/* Ajoute d'autres TextField ou composants pour les autres champs */}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Annuler</Button>
        <Button type="submit" onClick={handleSubmit}>
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProfile;
