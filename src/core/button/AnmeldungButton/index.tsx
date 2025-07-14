import { AppBar, Button, Toolbar } from "@mui/material";
import { AuthRoutes } from "../../../rootes";

import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

const AnmeldungButton = () => {
  return (
    <AppBar
      position="absolute"
      elevation={0}
      color="default"
      sx={{
        top: 0,
        right: 0,
        backgroundColor: "transparent",
        boxShadow: "none",
        zIndex: 10,
      }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", pr: 4, pt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LoginIcon />}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            px: 2,
            fontWeight: "bold",
            fontSize: 14,
            "&:hover": {
              backgroundColor: "transparent",
              borderColor: "primary.main",
            },
          }}
          component={Link}
          to={AuthRoutes.register}
        >
          Anmelden
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AnmeldungButton;
