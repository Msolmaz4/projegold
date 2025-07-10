import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Modal,
  Tooltip,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import type { User } from "../types/User.types";
import { useEffect, useState } from "react";
import Details from "./Details";
import { useUserContext } from "../hooks/user/useUserContext";
import { useAuthContext } from "../hooks/auth/useAuthContext";

type CardsProps = {
  user: User;
};

const Cards = ({ user }: CardsProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState(false);
  const { users, setUsers } = useUserContext();
  const { userData } = useAuthContext();

  useEffect(() => {
    if (user.image) {
      const logo = URL.createObjectURL(user.image);
      setImageUrl(logo);
      return () => URL.revokeObjectURL(logo);
    } else if (user?.imageURL) {
      setImageUrl(user?.imageURL);
    }
  }, [user.image, user.imageURL]);
  const handleOpen = () => {
    if (isAuthorized) {
      setOpenDetails(true);
    }
  };
  const handleClose = () => setOpenDetails(false);
  const handleDelete = (userId: number) => {
    setUsers(users.filter((u) => u.id !== userId));
    handleClose();
  };

  const isSameCompany = user?.id === userData?.id;
  const isAdmin = userData?.admin === true;
  const isAuthorized = isAdmin || isSameCompany;

  return (
    <>
      <Tooltip title={isAuthorized ? "" : "Unbefugter Zugriff!"} arrow>
        <Box>
          <Card
            onClick={handleOpen}
            sx={{
              minWidth: 160,
              textAlign: "center",
              py: 2,
              px: 1,
              border: "1px solid #ccc",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: isAuthorized ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease-in-out",
              backgroundColor: isSameCompany ? "#e3f2fd" : "#fff",
              "&:hover": {
                backgroundColor: isSameCompany
                  ? "#bbdefb"
                  : isAuthorized
                    ? "#f5f5f5"
                    : "#fff",
              },
            }}
            elevation={0}
          >
            <Avatar
              src={imageUrl || ""}
              alt={user.name}
              sx={{
                bgcolor: "#1976d2",
                width: 64,
                height: 64,
                mb: 1,
              }}
            >
              {!imageUrl && <BusinessIcon />}
            </Avatar>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {user.company?.name ?? user.name ?? "Kein Name vorhanden"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Tooltip>

      <Modal open={openDetails} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as const,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 600 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Details user={user} imageUrl={imageUrl} onDelete={handleDelete} />
        </Box>
      </Modal>
    </>
  );
};

export default Cards;
