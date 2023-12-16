import { ReactNode } from "react";
import { DataContext } from "./DataContext";
import useDataFetching from "../hook/useDataFetching";

interface IData {
  children: ReactNode;
}

const DataProvider: React.FC<IData> = ({ children }) => {
  const { data } = useDataFetching(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <DataContext.Provider value={{ data }}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
