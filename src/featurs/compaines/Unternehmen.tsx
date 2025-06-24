import { useGetUsersQuery } from "../../app/userApi";
import {
    Box,
    Typography,
    Avatar,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import BusinessIcon from "@mui/icons-material/Business";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useMediaQuery, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Modal from "../../utils/Modal";





function Unternehmen() {
    const { data, error, isLoading } = useGetUsersQuery();
    console.log(data)
    const [modal, setModal] = useState<boolean>(false);
    const [users, setUsers] = useState();
    useEffect(() => {
        if (data) {
            setUsers(data);
        }
    }, [data]); 

    console.log(users);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    if (isLoading) return <Typography>Lädt...</Typography>;
    if (error) return <Typography>Fehler beim Laden.</Typography>;
 


    return (
        <Box sx={{ mt: 4 }}>
            {modal && (
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                    onSave={(neue) => {
                        console.log("Gespeicherte Daten:", neue);
                         setUsers(prev => [...prev, neue]);
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
                            border: "1px solid red",
                        }}
                    >
                        <Typography variant="h5">Unternehmen</Typography>
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

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                navigation
                breakpoints={{
                    0: { slidesPerView: 1 }, // 0px ve üzeri: 1 slide
                    600: { slidesPerView: 2 }, // 600px ve üzeri: 2 slide
                    900: { slidesPerView: 3 }, // 900px ve üzeri: 3 slide
                    1200: { slidesPerView: 4 }, // 1200px ve üzeri: 4 slide
                }}
            >
                {users?.map((user) => (
                    <SwiperSlide key={user.id}>
                        <Card
                            sx={{
                                minWidth: 160,
                                textAlign: "center",
                                py: 2,
                                px: 1,
                            }}
                            elevation={3}
                        >
                            <Avatar
                                src={user.logoUrl || ""}
                                alt={user.name}
                                sx={{
                                    bgcolor: "#1976d2",
                                    width: 56,
                                    height: 56,
                                    margin: "0 auto",
                                }}
                            >
                                {!user.logoUrl && <BusinessIcon />}
                            </Avatar>
                            <CardContent>
                                <Typography variant="subtitle1">{user.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}

export default Unternehmen;
