import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { Box, TextField, Button, Typography } from "@mui/material";

const baseUrl = "http://localhost:8000/api/";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { loginUser } = useContext(AuthContext); // Utilise AuthContext pour gérer l'état d'authentification
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await axios.post(baseUrl + "users/token", {
        email,
        password,
      });
      if (response.status === 200) {
        // j'appelle loginuser de authcontext
        loginUser({
          access: response.data.access, // le token JWT pour l'accès
          refresh: response.data.refresh, // le token JWT pour le rafraîchissement
          first_name: response.data.first_name, // cette clé correspond à la réponse du backend
          last_name: response.data.last_name, //  cette clé correspond à la réponse du backend
          email: response.data.email,
          sex: response.data.sex,
          birth_date: response.data.birth_date,
          age: response.data.age,
          // ... autres informations
        });

        navigate("/"); // Redirige vers la page d'accueil ou tableau de bord
      } else {
        setError("Identifiants incorrects.");
      }
    } catch (error) {
      setError("Erreur lors de la connexion.");
      console.error("Erreur lors de la connexion:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(64 51 116 / 28%)",
          border: "1px solid rgb(87 70 154 / 52%)",
          borderRadius: "20px",
          p: 12,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            pb: 4,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Connexion
        </Typography>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <TextField
            sx={{ backgroundColor: "white" }}
            label="Email"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{ backgroundColor: "white" }}
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="secondary" variant="contained" type="submit">
            Se connecter
          </Button>
        </form>
        <p style={{ color: "white" }}>
          Pas encore de compte ?{" "}
          <a style={{ color: "white" }} href="/register">
            Inscrivez-vous
          </a>
        </p>
        {error && (
          <p style={{ color: "red" }} className="error">
            {error}
          </p>
        )}
      </Box>
    </Box>
  );
};

export default LoginPage;
