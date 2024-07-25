import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import React from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  FormLabel,
  TextField,
  FormControl,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import PredictButton from "./PredictButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HeartDataModal = ({ open, handleClose, onSaveSuccess }) => {
  // ...
  // Je récup les infos de mon user via authContext
  const { authData } = useContext(AuthContext);
  const user = authData.user;

  const [prediction, setPrediction] = useState(null);

  // États pour les champs du formulaire
  const [formData, setFormData] = useState({
    age: user.age, // Age
    sex: user.sex, // Sexe
    cp: "", // Douleur Thoracique
    trtbps: "", // Tension artérielle au repos
    chol: "", // Cholesterol Sérique
    fbs: "", // Taux de sucre
    restecg: "", // Electrocardiograme au repos
    thalachh: "", // Fréq. cardiaque max atteinte
    exng: "", // Angine provoquée par l'exercice
    oldpeak: "", // Dépréssion de l'index ST
    slp: "", // Pente du segment ST
    caa: "", // Nombre de vaisseaux colorés par la fluoroscopie
    thall: "", // Résultat du test de stress thallium
  });

  // Gestionnaire pour la mise à jour des états des champs du formulaire
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gestionnaire pour la soumission du formulaire
  const handleSave = async (event) => {
    event.preventDefault();

    // Récupération de l'objet authData du local storage
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData ? authData.token : null;
    console.log("Token utilisé pour l'authentification:", token);

    // Transformation de la valeur fbs
    const fbsOriginal = formData.fbs;
    const fbsTransformed = formData.fbs > 120 ? "1" : "0";

    const dataToSend = {
      ...formData,
      fbs: fbsTransformed,
      fbsOriginal,
      prediction: prediction, // Inclure la prédiction dans les données envoyées
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/heart/save-heart-data",
        dataToSend,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Appeler la fonction passée par les props pour mettre à jour l'historique dans la page Heart
      onSaveSuccess(response.data);
      // response.data est un terme utilisé dans le contexte des requêtes HTTP
      // pour référer aux données renvoyées par le serveur en réponse à une requête.
      // Lorsque tu effectues une requête HTTP, comme une requête POST,
      // en utilisant Axios ou une autre bibliothèque de requêtes côté client,
      // le serveur traite cette requête et renvoie une réponse.

      handleClose();
    } catch (error) {
      console.error("Erreur lors de l’enregistrement des données:", error);
      // Gérer l'erreur, par exemple afficher un message d'erreur
    }
  };

  // Gestionnaire pour Predict
  const handlePrediction = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/heart/predict-heart-condition",
        formData
      );
      const predictionResult = response.data.prediction;
      setPrediction(predictionResult[0]); // Stockez la prédiction dans l'état

      console.log("Prédiction:", predictionResult);
      console.log("Prédiction:", formData);
    } catch (error) {
      console.error(
        "Erreur lors de la requête:",
        error.response ? error.response : error
      );
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      sx={{ zIndex: 99999 }}
    >
      <AppBar sx={{ position: "relative", backgroundColor: "#261f4a" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Heart Data
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" autoFocus color="inherit" onClick={handleSave}>
            save
          </Button>
          <PredictButton onPredict={handlePrediction} />
        </Toolbar>
      </AppBar>
      <DialogContent>
        {prediction !== null && (
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
            Prediction:{" "}
            {prediction === 1
              ? "Heart Condition: Healthy"
              : "Heart Condition: Diseased"}
          </Typography>
        )}
        <form onSubmit={handleSave}>
          <Box
            sx={{
              width: "50%",
              margin: "0 auto",
            }}
          >
            {/* Age */}
            <TextField
              type="number"
              margin="normal"
              fullWidth
              disabled
              label="Age"
              value={formData.age}
              onChange={handleInputChange}
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Sex */}
            <FormControl>
              <FormLabel component="legend">Sex</FormLabel>
              <RadioGroup
                row
                aria-label="sex"
                value={formData.sex}
                onChange={handleInputChange}
                name="sex"
              >
                <FormControlLabel
                  disabled
                  value="0"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  disabled
                  value="1"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
            {/* CP */}
            <FormControl sx={{ display: "block" }}>
              <FormLabel component="legend">Douleur Thoracique</FormLabel>
              <RadioGroup
                row
                aria-label="cp"
                name="cp"
                value={formData.cp}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="Absence"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Légère"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Modérée"
                />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="Intense"
                />
              </RadioGroup>
            </FormControl>

            {/* Trestbps */}
            <TextField
              type="number"
              name="trtbps"
              margin="normal"
              fullWidth
              label="Tension artérielle au repos (mmHg)"
              value={formData.trtbps}
              onChange={handleInputChange}
            />
            {/* Chol */}
            <TextField
              type="number"
              margin="normal"
              name="chol"
              fullWidth
              label="Cholesterol Sérique (mg/dL)"
              value={formData.chol}
              onChange={handleInputChange}
            />
            {/* Fbs */}
            <TextField
              type="number"
              margin="normal"
              name="fbs"
              fullWidth
              label="Taux de sucre"
              value={formData.fbs}
              onChange={handleInputChange}
            />

            {/* RestECG */}
            <FormControl>
              <FormLabel>Electrocardiograme au repos</FormLabel>
              <RadioGroup
                row
                name="restecg"
                value={formData.restecg}
                onChange={handleInputChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
              </RadioGroup>
            </FormControl>

            {/* Thalach */}
            <TextField
              type="number"
              margin="normal"
              name="thalachh"
              fullWidth
              label="Fréq. cardiaque max atteinte (bpm)"
              value={formData.thalachh}
              onChange={handleInputChange}
            />

            {/* Exang */}
            <FormControl>
              <FormLabel>{"Angine provoquée par l'exercice"}</FormLabel>
              <RadioGroup
                row
                name="exng"
                value={formData.exng}
                onChange={handleInputChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
              </RadioGroup>
            </FormControl>

            {/* Oldpeak */}
            <TextField
              type="number"
              margin="normal"
              name="oldpeak"
              fullWidth
              label={"Dépréssion de l'index ST"}
              value={formData.oldpeak}
              onChange={handleInputChange}
            />

            {/* Slope */}
            <FormControl sx={{ display: "block" }}>
              <FormLabel>{"Pente du segment"}</FormLabel>
              <RadioGroup
                row
                name="slp"
                value={formData.slp}
                onChange={handleInputChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
              </RadioGroup>
            </FormControl>

            {/* Ca */}
            <FormControl sx={{ display: "block" }}>
              <FormLabel>{"Nombre de vaisseaux"}</FormLabel>
              <RadioGroup
                row
                name="caa"
                value={formData.caa}
                onChange={handleInputChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
                <FormControlLabel value="4" control={<Radio />} label="4" />
              </RadioGroup>
            </FormControl>

            {/* Thal */}
            <FormControl sx={{ display: "block" }}>
              <FormLabel>{"Résultat du test de stress thallium "}</FormLabel>
              <RadioGroup
                row
                name="thall"
                value={formData.thall}
                onChange={handleInputChange}
              >
                <FormControlLabel value="0" control={<Radio />} label="0" />
                <FormControlLabel value="1" control={<Radio />} label="1" />
                <FormControlLabel value="2" control={<Radio />} label="2" />
                <FormControlLabel value="3" control={<Radio />} label="3" />
              </RadioGroup>
            </FormControl>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HeartDataModal;
