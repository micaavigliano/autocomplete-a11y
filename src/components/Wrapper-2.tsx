import useDataFetching from "../hook/useDataFetching";
import Autocomplete from "./Autocomplete-input";

const Wrapper2 = () => {
  const { data } = useDataFetching(
    "https://hp-api.onrender.com/api/characters"
  );

  console.log(data);

  return (
    <>
      <Autocomplete options={data} labelKey="name" />
    </>
  );
};

export default Wrapper2;
