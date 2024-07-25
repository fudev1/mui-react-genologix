import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import dayjs from "dayjs";
import "dayjs/locale/fr";

const baseUrl = "http://localhost:8000/api/";

// * PAGE POUR L'INSCRIPTION D'UN USER * //
// *
// *

const Register = () => {
  //
  //
  // * ETAT DES CHAMPS DU FORMULAIRE * //
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // * ---------------------------- * //

  const navigate = useNavigate();

  // * ETAT DES MESSAGES * //
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    //  Reinitialisation des messages  //
    setSuccessMessage("");
    setError("");

    try {
      const response = await axios.post(baseUrl + "users/register", {
        first_name: firstName,
        last_name: lastName,
        sex: sex,
        email: email,
        password: password,
        birth_date: birthDate,
      });

      if (response.status === 201) {
        setSuccessMessage(
          "Compte créé avec succès. Vous pouvez maintenant vous connecter."
        );
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(response.data.error || "Impossible de créer le compte.");
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("Erreur lors de l’inscription.");
      }
      console.error("Erreur lors de l’inscription:", error);
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
          Register
        </Typography>{" "}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <TextField
            sx={{ backgroundColor: "white" }}
            label="First Name"
            margin="normal"
            variant="outlined"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            sx={{ backgroundColor: "white" }}
            label="Last Name"
            margin="normal"
            variant="outlined"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

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
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FormControl>
            <FormLabel sx={{ color: "white" }}>Gender</FormLabel>
            <RadioGroup
              sx={{ color: "white" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              row
              value={sex}
              onChange={(e) => setSex(e.target.value)}
            >
              <FormControlLabel value="0" control={<Radio />} label="Female" />
              <FormControlLabel value="1" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
            <DesktopDatePicker
              defaultValue={dayjs("")}
              inputFormat="YYYY-MM-DD"
              label="Birth Date"
              value={birthDate}
              onChange={(newValue) => {
                setBirthDate(newValue ? newValue.format("YYYY-MM-DD") : "");
              }}
            />
          </LocalizationProvider>

          <Button
            color="secondary"
            sx={{ mt: 2 }}
            variant="contained"
            type="submit"
          >
            Create an account
          </Button>
        </form>
        <p style={{ color: "white" }}>
          u have an account ?{" "}
          <a style={{ color: "white" }} href="/login">
            Connectez-vous
          </a>
        </p>
        {/* Affiche le message d'erreur */}
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
      </Box>
    </Box>
  );
};

export default Register;
