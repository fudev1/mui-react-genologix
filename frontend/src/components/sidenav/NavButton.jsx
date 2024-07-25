import Button from "@mui/material/Button";

const NavButton = ({ children, startIcon, isActive }) => {
  return (
    <Button
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "25px 10px",
        typography: "body2",
        color: "#6E6D7B",
        border: "1px solid transparent",
        borderRadius: "8px",
        "& .MuiButton-startIcon": {
          margin: 0,
          marginBottom: "10px",
        },
        "&:hover": {
          color: "#fff",
          borderColor: "#261F4A",
        },
        ...(isActive && {
          color: "#fff",
          borderColor: "#261F4A",
        }),
      }}
      variant="outlined"
      startIcon={startIcon}
    >
      {children}
    </Button>
  );
};

export default NavButton;
