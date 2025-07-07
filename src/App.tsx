import { Box, Typography } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import TaskTable from "./featurs/aufgabe/TaskTable";
import Unternehmen from "./featurs/compaines/Unternehmen";
import KategorieListe from "./featurs/tasks/KategorieListe";
import MilestoneOverview from "./featurs/milestones/MilestoneOverview";

function App() {
  return (
    <>
      <UserProvider>
        <Box
          sx={{
            minHeight: "100vh",
            backgroundColor: "#f5f5f5",
            padding: 2,
          }}
        >
          <Unternehmen />
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            AUFGABEKATEGORIEN
          </Typography>
          <KategorieListe />
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            align="center"
          >
            AUFGABEN
          </Typography>
          <TaskTable />
          <MilestoneOverview />
        </Box>
      </UserProvider>
    </>
  );
}

export default App;
