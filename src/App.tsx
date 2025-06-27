import { Typography } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import TaskTable from "./featurs/aufgabe/TaskTable";


import Unternehmen from "./featurs/compaines/Unternehmen"
import KategorieListe from "./featurs/tasks/KategorieListe";
import MilestoneOverview from "./featurs/milestones/MilestoneOverview";


function App() {



  return (
    <>
      <UserProvider>
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
      </UserProvider>
    </>
  );
}

export default App
