import { Box, Typography } from "@mui/material";
import Unternehmen from "../../featurs/compaines/Unternehmen";
import KategorieListe from "../../featurs/tasks/KategorieListe";
import MilestoneOverview from "../../featurs/milestones/MilestoneOverview";
import TaskTable from "../../featurs/aufgabe/TaskTable";
import useStyles from "./styles";

const MainLayout = () => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <Unternehmen />
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        AUFGABEKATEGORIEN
      </Typography>
      <KategorieListe />
      <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
        AUFGABEN
      </Typography>
      <TaskTable />
      <MilestoneOverview />
    </Box>
  );
};

export default MainLayout;
