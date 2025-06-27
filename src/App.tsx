import { Typography } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import TaskTable from "./featurs/aufgabe/TaskTable";


import Unternehmen from "./featurs/compaines/Unternehmen"
import KategorieListe from "./featurs/tasks/KategorieListe";


function App() {



  return (
    <>
      <UserProvider>
        <Unternehmen />
        <KategorieListe />
        <Typography variant="h4" gutterBottom align="center">
        Aufgabenübersicht
      </Typography>
      
        <TaskTable/>
      </UserProvider>
    </>
  );
}

export default App
