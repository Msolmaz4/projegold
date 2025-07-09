import { Box, Typography } from "@mui/material";
import Unternehmen from "../../featurs/compaines/Unternehmen";
import KategorieListe from "../../featurs/tasks/KategorieListe";
import MilestoneOverview from "../../featurs/milestones/MilestoneOverview";
import TaskTable from "../../featurs/aufgabe/TaskTable";

const MainLayout: FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
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
