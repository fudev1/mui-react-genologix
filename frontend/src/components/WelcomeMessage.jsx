import { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { Typography } from "@mui/material";

const WelcomeMessage = () => {
  const { authData } = useContext(AuthContext);

  const { firstName, lastName } = authData.user;

  return (
    <Typography fontSize={"30px"} fontWeight={"bold"}>
      {firstName} {lastName}
    </Typography>
  );
};

export default WelcomeMessage;
