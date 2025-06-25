import {
  Typography,
  Avatar,
  Card,
  CardContent,
  Box,
  Modal,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import type { User } from "../type";
import { useEffect, useState } from "react";
import Details from "../featurs/compaines/Details";

type CardsProps = {
  user: User;
};

const Cards = ({ user }: CardsProps) => {
  const [imageUr, setImageUr] = useState<string | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    if (user.image) {
      const logo = URL.createObjectURL(user.image);
      setImageUr(logo);
      return () => URL.revokeObjectURL(logo);
    }
  }, [user.image]);

  const handleOpen = () => setOpenDetails(true);
  const handleClose = () => setOpenDetails(false);

  return (
    <>
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
          cursor: "pointer",
          transition: "background-color 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        elevation={0}
      >
        <Avatar
          src={imageUr || ""}
          alt={user.name}
          sx={{
            bgcolor: "#1976d2",
            width: 64,
            height: 64,
            mb: 1,
          }}
        >
          {!imageUr && <BusinessIcon />}
        </Avatar>

        <CardContent sx={{ p: 1 }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {user.name}
          </Typography>
        </CardContent>
      </Card>

      <Modal open={openDetails} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
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
          <Details user={user} imageUrl={imageUr} />
        </Box>
      </Modal>
    </>
  );
};

export default Cards;
