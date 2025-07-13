import { Button, Stack,type ButtonProps  } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
type HinzufugenProps = {
  variant: ButtonProps["variant"];
  name: string;
  onClick: () => void;
};
const Hinzufugen: FC<HinzufugenProps> = ({ variant, name, onClick }) => {
  const { userData } = useAuthContext();
  const isAdmin = userData?.admin === true;
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant={variant}
        color={isAdmin ? "error" : "error"}
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>
      {isAdmin && (
        <Button
          variant={variant}
          color="primary"
          startIcon={<AddIcon />}
          onClick={onClick}
        >
          {name}
        </Button>
      )}
    </Stack>
  );
};

export default Hinzufugen;
