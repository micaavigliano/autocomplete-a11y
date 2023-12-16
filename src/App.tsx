import DataProvider from "./context/DataProvider";
import Wrapper from "./components/Wrapper";
import "./App.css";

function App() {
  return (
    <DataProvider>
      <Wrapper />
    </DataProvider>
  );
}

export default App;
