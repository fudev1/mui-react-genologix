import doctorAvatar from "../assets/images/pose_f9.png";
import doctorAvatar2 from "../assets/images/pose_m18.png";
import HeartImg from "../assets/images/heartanimv2.gif";

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTooltip } from "victory";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddchartIcon from "@mui/icons-material/Addchart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

// Components import
import HeartDataModal from "../components/heart/HeartDataModal";
import WelcomeMessage from "../components/WelcomeMessage";
import HistoryHeartData from "../components/heart/HistoryHeartData";

import {
  Chip,
  Paper,
  Card,
  Button,
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
} from "@mui/material";

// React import
import { useState, useEffect } from "react";
import axios from "axios";

const generateDataForPeriod = (numberOfMonths) => {
  const data = [];
  const currentDate = new Date();
  // Plage normale de BPM au repos pour un adulte : 60 - 100 BPM
  const minBPM = 60;
  const maxBPM = 100;
  const bpmVariance = 5; // Variance aléatoire pour simuler des variations naturelles

  for (let month = 0; month < numberOfMonths; month++) {
    const monthToAdd = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - month,
      1
    );
    const daysInMonth = new Date(
      monthToAdd.getFullYear(),
      monthToAdd.getMonth() + 1,
      0
    ).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      // Génération d'une valeur de BPM dans la plage normale avec une petite variance
      const dailyBPM = Math.random() * (maxBPM - minBPM) + minBPM;
      const variedBPM =
        dailyBPM + (Math.random() * bpmVariance * 2 - bpmVariance);
      data.push({
        x: `${monthToAdd.getFullYear()}-${monthToAdd.getMonth() + 1}-${day}`,
        y: Math.round(variedBPM), // Valeur arrondie pour BPM
      });
    }
  }
  return data.reverse(); // Pour commencer par le mois le plus récent
};

const Heart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [cholLevel, setCholLevel] = useState(null);

  const monthlyData = generateDataForPeriod(5);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // Fonction pour ajouter une nouvelle entrée à l'historique
  const updateHistory = (newData) => {
    setHistory((prevHistory) => [newData, ...prevHistory]);
    setSelectedHistory(newData);
  };

  const handleSelectHistory = (item) => {
    setSelectedHistory(item);
  };

  // +++ useEffect pour charlegement de l'historique
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
          if (response.data.length > 0) {
            // Prendre la dernière entrée comme sélectionnée par défaut
            setSelectedHistory(response.data[0]);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'historique:",
            error
          );
          setHistory([]);
        }
      }
    };

    fetchHistory();
  }, []);

  return (
    <Grid container spacing={2} p={4}>
      {/* SUBTITLE WELCOME + BUTTON */}
      <Grid container p={4}>
        <Grid item xs={8}>
          <Box>
            <Typography>
              <span style={{ color: "#57469a" }}>Home</span> / Heart
            </Typography>
            <Typography fontSize={"30px"} fontWeight={"bold"}>
              Heart Prediction
            </Typography>
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
        >
          <Box>
            <Button
              onClick={handleModalOpen}
              variant="contained"
              size="large"
              startIcon={<AddchartIcon />}
              sx={{
                backgroundColor: "#57469a",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#9d4ca7",
                  color: "#fff",
                },
              }}
            >
              Add Data Analysis
            </Button>
            <HeartDataModal
              open={modalOpen}
              handleClose={handleModalClose}
              // Je mets les données de l'historique dans le modale que je renvoie dans le
              // useEffect pour recharger l'historique apres l'ajout d'une nouvelle entrée
              onSaveSuccess={updateHistory}
            />
          </Box>
        </Grid>
      </Grid>

      {/* LEFT SIDE */}
      <Grid item xs={6}>
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
          <Box sx={{ display: "flex", flexDirection: "row", zIndex: 9999 }}>
            {/* En-tête avec la fréquence cardiaque */}
            <Box width={"250px"} p={4}>
              <Typography variant="h7" component="div" gutterBottom>
                Max Heart Rate
              </Typography>
              <Typography
                variant="h1"
                component="div"
                sx={{ fontWeight: "bold", color: "rgb(87 70 154 / 90%)" }}
              >
                {selectedHistory ? `${selectedHistory.thalachh} BPM` : "-"}
              </Typography>
            </Box>

            {/* Illustration du cœur */}
            <Box
              sx={{
                width: 260, // Taille de ton illustration
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 2,
                mx: 6,
              }}
            >
              {/* Image de l'illustration de cœur */}
              <img
                src={HeartImg}
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
                <Typography variant="subtitle1">Chest Pain</Typography>
                <Typography variant="h5">
                  {selectedHistory
                    ? selectedHistory.cp !== null
                      ? selectedHistory.cp === 0
                        ? "None"
                        : selectedHistory.cp === 1
                        ? "Mild"
                        : selectedHistory.cp === 2
                        ? "Moderate"
                        : "Severe"
                      : "Data not available"
                    : "Loading..."}
                </Typography>
              </CardContent>
            </Card>
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
                <Typography variant="subtitle1">Heart Condition</Typography>
                <Typography variant="h5">
                  {selectedHistory ? (
                    selectedHistory.prediction !== null ? (
                      selectedHistory.prediction === 1 ? (
                        "Healthy"
                      ) : (
                        "Diseased"
                      )
                    ) : (
                      <Button color="secondary" variant="outlined">
                        Predict Available
                      </Button>
                    )
                  ) : (
                    "Loading..."
                  )}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Gradient */}
          <svg style={{ height: 0 }}>
            <defs>
              <linearGradient id="myGradient" gradientTransform="rotate(90)">
                <stop offset="0%" stopColor="#261f4a" />
                <stop offset="80%" stopColor="#261f4a" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Graphique */}
          <VictoryChart
            domainPadding={0}
            padding={{ top: 20, bottom: 20, left: 0, right: 0 }}
            style={{
              parent: {
                background: "transparent",
                marginBottom: "-65%",
                zIndex: 99,
                top: "-450px",
              },
            }}
          >
            {/* Cache les axes */}
            <VictoryAxis
              style={{
                axis: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "transparent" },
                grid: { stroke: "transparent" },
                ticks: { stroke: "transparent" },
                tickLabels: { fill: "transparent" },
              }}
            />

            {/* Graphique à barres */}
            <VictoryBar
              data={monthlyData}
              x="x"
              y="y"
              style={{ data: { fill: "url(#myGradient)" } }}
              barRatio={0.6}
              labelComponent={<VictoryTooltip />}
              // Active les infobulles
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: "labels",
                          mutation: () => ({ active: true }),
                        },
                      ];
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: "labels",
                          mutation: () => ({ active: false }),
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </VictoryChart>
        </Box>

        <Box marginTop={4} marginBottom={4}>
          <Typography fontSize={"25px"} fontWeight={"bold"}>
            Doctors Appointement
          </Typography>
        </Box>

        <Box display={"flex"} flexDirection={"row"}>
          {/* Card doctor */}
          <Card
            component={Paper}
            sx={{
              m: 1,
              overflow: "visible",
              backgroundColor: "rgb(64 51 116 / 28%)",
              color: "rgba(231, 227, 252, 0.87)",
              position: "relative",
              width: "50%",
              border: "1px solid rgb(87 70 154 / 52%)",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "900" }} variant="subtitle1">
                Sophia Loren
              </Typography>
              <Typography
                sx={{ display: "block", marginBottom: "20px" }}
                component="span"
              >
                Heart Specialist
              </Typography>
              <Box sx={{ marginRight: "80px" }}>
                <Chip
                  size="small"
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    color: "#fff",
                    backgroundColor: "#57469a",
                    marginTop: "5px",
                  }}
                  icon={<CalendarMonthIcon />}
                  label="19 Oct. 23"
                />
                <Chip
                  size="small"
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    color: "#fff",
                    backgroundColor: "#57469a",
                    marginTop: "5px",
                  }}
                  icon={<AccessTimeIcon />}
                  label="16:30 PM"
                />
              </Box>
              <img
                style={{
                  position: "absolute",
                  height: "177px",
                  bottom: "0px",
                  right: "7px",
                }}
                src={doctorAvatar}
                alt=""
              />
            </CardContent>
          </Card>

          <Card
            component={Paper}
            sx={{
              width: "50%",
              m: 1,
              overflow: "visible",
              backgroundColor: "rgb(64 51 116 / 28%)",
              color: "rgba(231, 227, 252, 0.87)",
              position: "relative",
              border: "1px solid rgb(87 70 154 / 52%)",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "900" }} variant="subtitle1">
                Giovanni Conti
              </Typography>
              <Typography
                sx={{ display: "block", marginBottom: "20px" }}
                component="span"
              >
                Lung Specialist
              </Typography>
              <Box sx={{ marginRight: "80px" }}>
                <Chip
                  size="small"
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    color: "#fff",
                    backgroundColor: "#57469a",
                    marginTop: "5px",
                  }}
                  icon={<CalendarMonthIcon />}
                  label="19 Oct. 23"
                />
                <Chip
                  size="small"
                  sx={{
                    display: "flex",
                    width: "fit-content",
                    color: "#fff",
                    backgroundColor: "#57469a",
                    marginTop: "5px",
                  }}
                  icon={<AccessTimeIcon />}
                  label="16:30 PM"
                />
              </Box>
              <img
                style={{
                  position: "absolute",
                  height: "177px",
                  bottom: "0px",
                  right: "7px",
                }}
                src={doctorAvatar2}
                alt=""
              />
            </CardContent>
          </Card>
        </Box>
      </Grid>

      {/* RIGHT SIDE */}
      <Grid item xs={6}>
        {/* ANALYTICS */}
        <Box marginTop={4} marginBottom={4}>
          <Typography
            sx={{ marginBottom: "20px" }}
            fontSize={"25px"}
            fontWeight={"bold"}
          >
            Analytics
          </Typography>
          <Grid item lg={12} xs={12} sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid item xs={6}>
              <Card
                sx={{
                  backgroundColor: "rgb(64 51 116 / 28%)",
                  border: "1px solid rgb(87 70 154 / 52%)",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, color: "white", fontWeight: "500" }}
                    gutterBottom
                  >
                    Blood Pressure
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 36,
                      color: "white",
                      fontWeight: "900",
                      marginBottom: "0px",
                    }}
                    gutterBottom
                  >
                    {selectedHistory
                      ? `${selectedHistory.chol} /80`
                      : "Loading..."}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, color: "#57469a", fontWeight: "600" }}
                    gutterBottom
                  >
                    mmHg
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  backgroundColor: "rgb(64 51 116 / 28%)",
                  border: "1px solid rgb(87 70 154 / 52%)",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, color: "white", fontWeight: "500" }}
                    gutterBottom
                  >
                    Cholestherol
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 36,
                      color: "white",
                      fontWeight: "900",
                      marginBottom: "0px",
                    }}
                    gutterBottom
                  >
                    {selectedHistory ? selectedHistory.chol : "Loading..."}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, color: "#57469a", fontWeight: "600" }}
                    gutterBottom
                  >
                    mg/dL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  backgroundColor: "rgb(64 51 116 / 28%)",
                  border: "1px solid rgb(87 70 154 / 52%)",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, color: "white", fontWeight: "500" }}
                    gutterBottom
                  >
                    Sugar Level
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 36,
                      color: "white",
                      fontWeight: "900",
                      marginBottom: "0px",
                    }}
                    gutterBottom
                  >
                    {selectedHistory
                      ? selectedHistory.fbsOriginal !== null
                        ? selectedHistory.fbsOriginal === 1
                          ? "> 120"
                          : "< 120"
                        : "Loading..."
                      : "No data available"}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, color: "#57469a", fontWeight: "600" }}
                    gutterBottom
                  >
                    mg/dL
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                sx={{
                  backgroundColor: "rgb(64 51 116 / 28%)",
                  border: "1px solid rgb(87 70 154 / 52%)",
                  marginRight: "10px",
                  marginBottom: "20px",
                }}
              >
                <CardContent>
                  <Typography
                    sx={{ fontSize: 14, color: "white", fontWeight: "500" }}
                    gutterBottom
                  >
                    Old Peak
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 36,
                      color: "white",
                      fontWeight: "900",
                      marginBottom: "0px",
                    }}
                    gutterBottom
                  >
                    {selectedHistory ? selectedHistory.oldpeak : "Loading..."}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 18, color: "#57469a", fontWeight: "600" }}
                    gutterBottom
                  >
                    mm
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* SECTION HISTORIQUE */}
        <HistoryHeartData
          history={history}
          selectedHistory={selectedHistory}
          onSelectHistory={handleSelectHistory}
        />

        {/* SECTION RECOMMANDATIONS */}
        {/* <Box marginTop={4} marginBottom={4}>
          <Typography
            sx={{ marginBottom: "20px" }}
            fontSize={"25px"}
            fontWeight={"bold"}
          >
            Recommandations
          </Typography>

          <Card
            sx={{
              minWidth: 275,

              backgroundColor: "transparent",
              border: "1px solid rgb(87 70 154 / 52%)",
            }}
          >
            <CardContent>
              <Typography sx={{ fontSize: 14, color: "white" }} gutterBottom>
                Word of the Day
              </Typography>
              <Typography color="white" variant="h5" component="div">
                dfsf
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="white">
                adjective
              </Typography>
              <Typography variant="body2" color="white">
                well meaning and kindly.
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
                Word of the Day
              </Typography>
              <Typography color="white" variant="h5" component="div">
                dfsf
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="white">
                adjective
              </Typography>
              <Typography variant="body2" color="white">
                well meaning and kindly.
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
                Word of the Day
              </Typography>
              <Typography color="white" variant="h5" component="div">
                dfsf
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="white">
                adjective
              </Typography>
              <Typography variant="body2" color="white">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Box> */}
      </Grid>
    </Grid>
  );
};

export default Heart;
