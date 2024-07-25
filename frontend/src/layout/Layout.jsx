import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideNav from "../components/SideNav";
import { Typography } from "@mui/material";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      {/* Blur Effect Gradient */}
      <Box
        sx={{
          bgcolor: "transparent",
          width: "0px",
          height: "0px",
          display: "block",
          boxShadow: "0px 0px 250px 140px #9d4ca76b",
          position: "absolute",
          top: "730px",
          zIndex: 1,
          left: "260px",
        }}
      ></Box>
      {/* Blur Effect Gradient */}
      <Box
        sx={{
          bgcolor: "transparent",
          width: "0px",
          height: "0px",
          display: "block",
          boxShadow: "0px 0px 200px 60px #9d4ca7de",
          position: "absolute",
          top: "150px",
          zIndex: 1,
          left: "950px",
        }}
      ></Box>

      {/* Content Page = SideNav + TopBar */}
      <Box
        sx={{
          display: "flex",
          color: "white",
          bgcolor: "#08041D",
        }}
      >
        <SideNav />

        {/* Box qui contient TopBar + Contenu */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          {/* En-tête */}
          <TopBar />
          {/* Contenu des pages */}
          <Box
            component={"main"}
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Outlet />
          </Box>
          {/* Pied de page */}
          <Box
            sx={{
              backgroundColor: "#08041D",
              color: "#fff",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography
              sx={{ fontSize: "0.75rem", color: "rgb(255 255 255 / 40%)" }}
            >
              GENOLOGIX by Quentin. SouSouf & Mdv - 2023
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
