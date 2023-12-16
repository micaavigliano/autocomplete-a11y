import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Autocomplete from "../components/Autocomplete-input";

const App = () => {
  const { data } = useContext(DataContext);
  console.log(data);
  return (
    <>
      <Autocomplete options={data} labelKey="name" />
    </>
  );
};

export default App;
