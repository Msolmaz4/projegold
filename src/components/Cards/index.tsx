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
import type { User } from "types";
import { useEffect, useState } from "react";
import { useAuthContext } from "hooks";
import { useUserContext } from "hooks";
import Details from "../Details";
import useStyles from "./styles";

type CardsProps = {
  user: User;
};

const Cards = ({ user }: CardsProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [openDetails, setOpenDetails] = useState(false);
  const { users, setUsers } = useUserContext();
  const { userData } = useAuthContext();
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (user.image) {
      console.log("geldik");
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
        <Box className={classes.cardBox}>
          <Card
            onClick={handleOpen}
            className={cx(
              classes.card,
              isSameCompany && classes.cardSameCompany,
              !isAuthorized && classes.notAllowed
            )}
            elevation={0}
          >
            <Avatar
              src={imageUrl || ""}
              alt={user.name}
              className={classes.avatar}
            >
              {!imageUrl && <BusinessIcon />}
            </Avatar>
            <CardContent className={classes.cardContent}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                {user.company?.name ?? user.name ?? "Kein Name vorhanden"}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Tooltip>

      <Modal open={openDetails} onClose={handleClose}>
        <Box className={classes.modalBox}>
          <Details user={user} imageUrl={imageUrl} onDelete={handleDelete} />
        </Box>
      </Modal>
    </>
  );
};

export default Cards;
