import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

import bodyImg from "../assets/images/body3.png";
import medicImg from "../assets/images/medic11.png";

import WelcomeMessage from "../components/WelcomeMessage";

const Home = () => {
  const [history, setHistory] = useState([]);

  // Récupération de l'objet authData du local storage
  // const authData = JSON.parse(localStorage.getItem("authData"));
  // const token = authData ? authData.token : null;

  useEffect(() => {
    const fetchHistory = async () => {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;

      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:8000/api/heart/history",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setHistory(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'historique:",
            error
          );
        }
      }
    };

    fetchHistory();
  }, []);

  // Gestion du clic sur le bouton "Predict Available"
  const handlePredictAvailable = (dataId) => {
    // Ici, logique pour envoyer la requête de prédiction pour l'entrée spécifique
    console.log(`Lancer la prédiction pour l'entrée d'ID: ${dataId}`);
  };

  return (
    <Grid container spacing={2} p={4}>
      <Grid container p={4}>
        <Grid item xs={8}>
          <Box>
            <Typography sx={{ color: "#57469a" }}>Hey, What's up</Typography>
            <WelcomeMessage />
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        ></Grid>
      </Grid>
      {/* {console.log(history)} */}
      <Grid item xs={6}>
        <div>
          <img style={{ width: "600px" }} src={bodyImg} alt="" />
        </div>
      </Grid>
      <Grid item xs={6}>
        <img src={medicImg} alt="" />
      </Grid>
    </Grid>
  );
};

export default Home;
