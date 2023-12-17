import useDataFetching from "../hook/useDataFetching";
import Autocomplete from "./Autocomplete-input";

const Wrapper = () => {
  const { data } = useDataFetching(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <>
      <Autocomplete options={data} labelKey="name" />
    </>
  );
};

export default Wrapper;
