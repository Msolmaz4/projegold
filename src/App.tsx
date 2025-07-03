import { Box, Typography } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import TaskTable from "./featurs/aufgabe/TaskTable";
import Unternehmen from "./featurs/compaines/Unternehmen"
import KategorieListe from "./featurs/tasks/KategorieListe";
import MilestoneOverview from "./featurs/milestones/MilestoneOverview";


function App() {
  return (
    <>
      <UserProvider>
        <Box
          sx={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5', // Açık gri arka plan
            padding: 2,
          }}
        >
          <Unternehmen />
          <Typography variant="h4" gutterBottom align="center">
            AUFGABEKATEGORIEN
          </Typography>
          <KategorieListe />
          <Typography variant="h4" gutterBottom align="center">
            AUFGABEN
          </Typography>
          <TaskTable />
          <MilestoneOverview />
        </Box>
      </UserProvider>
    </>
  );
}

export default App
