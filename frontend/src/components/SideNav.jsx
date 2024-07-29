import Drawer from "@mui/material/Drawer";
import { Stack, Box } from "@mui/material";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../lib/navigation";
import { Link, useLocation } from "react-router-dom";
import NavButton from "./sidenav/NavButton";

const SideNav = () => {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 160,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        "& .MuiDrawer-paper": {
          width: 160,
          bgcolor: "transparent",
        },
      }}
    >
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            fontSize: "16px",
            marginBottom: 10,
            color: "#ffffff",
            fontWeight: "bold",
          }}
        >
          GENOLOGIX
        </Box>
        <Stack direction="column" spacing={2}>
          {DASHBOARD_SIDEBAR_LINKS.map((item) => (
            <SideNavLink
              key={item.key}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </Stack>
        <Stack
          sx={{ marginTop: "auto", flex: 0 }}
          direction="column"
          spacing={2}
        >
          {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
            <SideNavLink
              key={item.key}
              item={item}
              isActive={location.pathname === item.path}
            />
          ))}
        </Stack>
      </Box>
    </Drawer>
  );
};

function SideNavLink({ item }) {
  const location = useLocation();

  const isActive = location.pathname === item.path;

  return (
    <Link className="SideNavLink" to={item.path}>
      <NavButton startIcon={item.icon} isActive={isActive}>
        {item.label}
      </NavButton>
    </Link>
  );
}

export default SideNav;
