import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
} from "@mui/material";

const HistoryHeartData = ({ history, selectedHistory, onSelectHistory }) => {
  // Gestion du clic sur le bouton "Predict Available"
  const handlePredictAvailable = (dataId) => {
    // Ici, logique pour envoyer la requête de prédiction pour l'entrée spécifique
    console.log(`Lancer la prédiction pour l'entrée d'ID: ${dataId}`);
  };

  return (
    <Box marginTop={4} marginBottom={4}>
      <Typography
        sx={{ marginBottom: "20px" }}
        fontSize={"25px"}
        fontWeight={"bold"}
      >
        History
      </Typography>
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "rgb(64 51 116 / 28%)",
          border: "1px solid rgb(87 70 154 / 52%)",
        }}
      >
        <CardContent>
          {history.length > 0 ? (
            <Stack spacing={1}>
              {history.map((dataItem) => (
                <Card
                  key={dataItem.id}
                  sx={{
                    backgroundColor:
                      selectedHistory === dataItem
                        ? "rgb(87 70 154 / 52%)"
                        : "rgb(8 4 31 / 63%)",
                    border: "1px solid rgb(87 70 154 / 52%)",
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "rgb(87 70 154 / 52%)",
                      cursor: "pointer",
                    },
                  }}
                  variant="outlined"
                  onClick={() => onSelectHistory(dataItem)}
                >
                  <CardContent>
                    {/* Date et heure */}
                    <Typography sx={{ fontSize: "14px", color: "#9d4ca7" }}>
                      {new Date(dataItem.created_at).toLocaleDateString()} -{" "}
                      {new Date(dataItem.created_at).toLocaleTimeString()}
                    </Typography>
                    {/* Données */}
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", color: "#fff" }}
                    >
                      AGE: {dataItem.age} - CP: {dataItem.cp} - TRTBPS:{" "}
                      {dataItem.trtbps} - CHOL: {dataItem.chol} - FBS:{" "}
                      {dataItem.fbs} - RESTECG: {dataItem.restecg} - THALACHH:{" "}
                      {dataItem.thalachh} - EXNG: {dataItem.exng} - OLDPEAK:{" "}
                      {dataItem.oldpeak} - SLP: {dataItem.slp} - CAA:{" "}
                      {dataItem.caa} - THALL: {dataItem.thall} - PREDICTION:{" "}
                      {dataItem.prediction !== null ? (
                        dataItem.prediction
                      ) : (
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handlePredictAvailable(dataItem.id)}
                          sx={{ mt: 1 }}
                        >
                          Predict Available
                        </Button>
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "14px", color: "#fff" }}>
              No history available
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default HistoryHeartData;
