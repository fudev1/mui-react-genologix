import React, { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { MuiFileInput } from "mui-file-input";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Grid,
  CardActions,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LungImg from "../assets/images/lunganimv2.gif";

import { VictoryStack, VictoryChart, VictoryAxis, VictoryArea } from "victory";

const sampleData = [
  { x: "Capacité", y: 2 },
  { x: "Débit d'air", y: 4 },
  { x: "Efficacité", y: 5 },
  { x: "Endurance", y: 2 },
  { x: "Force", y: 3 },
];

const Lung = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Gestionnaire pour le changement de fichier
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Gestionnaire pour l'envoi du fichier
  const handleSubmit = async (event) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    // Récupère le token depuis le localStorage
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;

    try {
      const response = await axios.post(
        "http://localhost:8000/api/lung/predict-lung",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const predictionScore = response.data.prediction[0][0];
      const predictionPercentage = (predictionScore * 100).toFixed(2);
      setPrediction(` ${predictionPercentage}% Risk `);
      setError(""); // Clear any previous errors
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        "Une erreur s'est produite lors de la prédiction.";
      setError(errorMsg);
      setPrediction(""); // Clear any previous prediction
    }
  };
  return (
    <Grid container spacing={2} p={4}>
      <Grid item xs={8}>
        <Box>
          <span style={{ color: "#57469a" }}>Home</span> / Lung
          <Typography fontSize={"30px"} fontWeight={"bold"}>
            Lung Prediction
          </Typography>
        </Box>
        {/* Card Fréquence cardiaque */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "transparent",
            marginTop: "40px",
            marginBottom: "60px",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              zIndex: 9999,
            }}
          >
            {/* En-tête avec la fréquence cardiaque */}
            <Box width={"250px"} p={4}>
              <Typography variant="h7" component="div" gutterBottom>
                Risk of Lung Pneumonia
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ fontWeight: "bold", color: "rgb(87 70 154 / 90%)" }}
              >
                {prediction}
              </Typography>
            </Box>

            {/* Illustration du cœur */}
            <Box
              sx={{
                width: 380, // Taille de ton illustration
                display: "flex",
                my: 2,
                mx: 6,
              }}
            >
              {/* Image de l'illustration de cœur */}
              <img
                src={LungImg}
                alt="Heart"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </Box>
          </Box>

          {/* Cartes d'information */}
          <Box
            sx={{
              width: "500px",
              display: "flex",
              justifyContent: "space-around",
              backdropFilter: "blur(15px)",
              backgroundColor: "rgb(64 51 116 / 28%)",
              position: "relative",
              marginTop: "-130px",
              padding: "10px",
              zIndex: 9999,
            }}
          >
            <Card
              sx={{
                m: 1,
                py: 1,
                flex: 1,
                bgcolor: "rgb(8 4 31 / 63%)",
                color: "white",
                border: "1px solid rgb(87 70 154 / 52%)",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1" mb={2}>
                  Launch a new Predict
                </Typography>
                <input // Utilise l'élément input natif pour gérer le fichier
                  ref={fileInputRef} // Attache la référence à l'input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                />
                <Button
                  sx={{ mr: 2 }}
                  color="secondary"
                  variant="outlined"
                  startIcon={<CloudUploadIcon />}
                  onClick={() => fileInputRef.current.click()} // Ouvre la boîte de dialogue de fichier au clic
                >
                  Upload File
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit} // Gère la soumission ici
                >
                  Submit Prediction
                </Button>
                {/* Affichage des erreurs et des prédictions */}
                {error && <Typography color="error">{error}</Typography>}
                {prediction && <Typography>{prediction}</Typography>}
              </CardContent>
            </Card>
            {/* <Card
              sx={{
                m: 1,
                py: 1,
                flex: 1,
                bgcolor: "rgb(8 4 31 / 63%)",
                color: "white",
                border: "1px solid rgb(87 70 154 / 52%)",
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">Lung Condition</Typography>
                <Typography variant="h5">Normal</Typography>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {prediction && <p>Résultat de la prédiction : {prediction}</p>}
              </CardContent>
            </Card> */}
          </Box>

          {/* Graphique */}

          <VictoryChart
            padding={{ top: 20, bottom: 20, left: 0, right: 0 }}
            style={{
              parent: {
                background: "transparent",
                marginBottom: "-65%",
                zIndex: 99,
                top: "-570px",
              },
            }}
          >
            <VictoryAxis
              tickFormat={() => ""}
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={() => ""}
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
              }}
            />
            <VictoryStack>
              <VictoryArea
                name="area-1"
                data={sampleData}
                style={{
                  data: { fill: "rgb(87 70 154 / 52%)", stroke: "none" },
                }}
              />
              <VictoryArea
                name="area-2"
                data={sampleData}
                style={{ data: { fill: "#57469a", stroke: "none" } }}
              />
              <VictoryArea
                name="area-3"
                data={sampleData}
                style={{ data: { fill: "#403374", stroke: "none" } }}
              />
              <VictoryArea
                name="area-4"
                data={sampleData}
                style={{ data: { fill: "#261f4a", stroke: "none" } }}
              />
            </VictoryStack>
          </VictoryChart>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box marginTop={4} marginBottom={4}>
          <Typography fontSize={"25px"} fontWeight={"bold"}>
            Recommandations
          </Typography>
        </Box>
        <Card
          sx={{
            minWidth: 275,

            backgroundColor: "transparent",
            border: "1px solid rgb(87 70 154 / 52%)",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
              Lorem Ipsum
            </Typography>
            <Typography color="white" variant="h5" component="div">
              Lorem Ipsum
            </Typography>

            <Typography variant="body2" color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              repellendus unde laborum, quos sit nisi placeat incidunt, itaque
              accusamus omnis nesciunt exercitationem pariatur ab aliquid
              praesentium? Doloremque saepe reiciendis consequuntur.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>

        <Card
          sx={{
            minWidth: 275,
            marginTop: 2,
            backgroundColor: "transparent",
            border: "1px solid rgb(87 70 154 / 52%)",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
              Lorem Ipsum
            </Typography>
            <Typography color="white" variant="h5" component="div">
              Lorem Ipsum
            </Typography>

            <Typography variant="body2" color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              repellendus unde laborum, quos sit nisi placeat incidunt, itaque
              accusamus omnis nesciunt exercitationem pariatur ab aliquid
              praesentium? Doloremque saepe reiciendis consequuntur.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
        <Card
          sx={{
            minWidth: 275,
            marginTop: 2,
            backgroundColor: "transparent",
            border: "1px solid rgb(87 70 154 / 52%)",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
              Lorem Ipsum
            </Typography>
            <Typography color="white" variant="h5" component="div">
              Lorem Ipsum
            </Typography>

            <Typography variant="body2" color="white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
              repellendus unde laborum, quos sit nisi placeat incidunt, itaque
              accusamus omnis nesciunt exercitationem pariatur ab aliquid
              praesentium? Doloremque saepe reiciendis consequuntur.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Lung;
