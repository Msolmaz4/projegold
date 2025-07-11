import { Box, Typography } from "@mui/material";
import Unternehmen from "../Company";
import useStyles from "./styles";
import MilestoneOverview from "../MilestoneOwer";
import TaskTable from "../../featurs/aufgabe/TaskTable";
//import KategorieListe from "../../featurs/tasks/KategorieListe";
import KategorieListe from "../Tasks";

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
