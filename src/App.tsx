import { UserProvider } from "./context/UserContext";
import Unternehmen from "./featurs/compaines/Unternehmen"
import KategorieListe from "./featurs/tasks/KategorieListe";


function App() {



  return (
    <>
      <UserProvider>
        <Unternehmen />
        <KategorieListe />
        </UserProvider>
    </>
  );
}

export default App
