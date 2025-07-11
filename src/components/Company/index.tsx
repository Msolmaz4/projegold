import { Box, Typography, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useUserContext } from "../../hooks/user/useUserContext";
import "swiper/css";
import "swiper/css/navigation";
import Hinzufugen from "../../core/button/HinzufugenButton/index";
import { Modal } from "../../utils";
import Cards from "../../components/Cards";
import useStyles from "./styles";

function Unternehmen() {
  const [modal, setModal] = useState<boolean>(false);
  const { users, setUsers } = useUserContext();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { classes, cx } = useStyles();

  return (
    <Box className={classes.root}>
      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          onSave={(neue) => {
            console.log("Gespeicherte Daten:", neue);
            setUsers((prev) => [...prev, neue]);
            setModal(false);
          }}
        />
      )}

      <Box className={classes.header}>
        {!isSmallScreen && (
          <Box className={classes.headerTitleBox}>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              className={classes.headerTitle}
            >
              UNTERNEHMEN
            </Typography>
          </Box>
        )}

        <Box className={classes.addButtonBox}>
          <Hinzufugen
            variant="contained"
            name="Hinzufügen"
            onClick={() => setModal(true)}
          />
        </Box>
      </Box>

      <Box className={classes.swiperWrapper}>
        <IconButton
          className={cx(
            "custom-swiper-prev",
            classes.navButton,
            classes.navButtonPrev
          )}
          aria-label="previous"
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          className={cx(
            "custom-swiper-next",
            classes.navButton,
            classes.navButtonNext
          )}
          aria-label="next"
        >
          <ArrowForwardIosIcon />
        </IconButton>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            nextEl: ".custom-swiper-next",
            prevEl: ".custom-swiper-prev",
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1000: { slidesPerView: 4 },
            1600: { slidesPerView: 5 },
            1800: { slidesPerView: 6 },
          }}
        >
          {users
            ?.slice()
            .reverse()
            .map((user) => (
              <SwiperSlide key={user.id}>
                <Box className={classes.slideBox}>
                  <Cards user={user} />
                </Box>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
}

export default Unternehmen;
