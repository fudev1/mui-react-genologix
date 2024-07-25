import { Button } from "@mui/material";

const PredictButton = ({ onPredict }) => {
  return (
    <Button color="inherit" onClick={onPredict}>
      Predict
    </Button>
  );
};

export default PredictButton;
