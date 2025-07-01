
import {
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useMediaQuery, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import Modal from "../../utils/Modal";



import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Cards from "../../components/Cards";
import { useUser } from "../../context/UserContext";




function Unternehmen() {
    const [modal, setModal] = useState<boolean>(false);
    const { users, setUsers } = useUser()
    //console.log(users,'unternej´hmen');
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    // if (isLoading) return <Typography>Lädt...</Typography>;
    // if (error) return <Typography>Fehler beim Laden.</Typography>;
    return (
        <Box sx={{ mt: 4 }}>
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

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    position: "relative",
                }}
            >
                {!isSmallScreen && (
                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            // border: "1px solid red",
                        }}
                    >
                        <Typography variant="h5">UNTERNEHMEN</Typography>
                    </Box>
                )}

                <Box sx={{ marginLeft: "auto" }}>
                    <Button
                        variant="contained"
                        onClick={() => setModal(true)}
                        startIcon={<AddIcon />}
                    >
                        Hinzufügen
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    position: "relative",
                    mt: 3,
                    // border: "1px solid red",
                    minHeight: 220,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    px: 4,
                    // border: "1px solid red",
                }}
            >
                {/* linker blauer Pfeil */}
                <IconButton
                    className="custom-swiper-prev"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: 2,
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    <ArrowBackIosNewIcon />
                </IconButton>

                {/* rechter blauer Pfeil */}
                <IconButton
                    className="custom-swiper-next"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        right: 1,
                        transform: "translateY(-50%)",
                        zIndex: 10,
                        backgroundColor: "#1976d2",
                        color: "white",
                        "&:hover": {
                            backgroundColor: "#1565c0",
                        },
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                {/* SWIPER */}
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
                    {users?.map((user) => (
                        <SwiperSlide key={user.id}>
                            <Box sx={{ px: "10px", py: "10px" }}>
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
