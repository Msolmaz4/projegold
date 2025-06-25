import { UserProvider } from "./context/UserContext";
import Unternehmen from "./featurs/compaines/Unternehmen"
import AufgabenCategories from "./featurs/tasks/AufgabenCategories";


function App() {
  


  return (
    <>
      <UserProvider>
        <Unternehmen />
         <AufgabenCategories tasks={["Marketing", "Softwareentwicklung", "Support"]} /> 

      </UserProvider>
    </>
  );
}

export default App
