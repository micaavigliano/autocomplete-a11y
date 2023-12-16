import { createContext } from "react";

export interface IDataResponse {
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface IData {
  data: IDataResponse[];
}

export const DataContext = createContext<IData>({} as IData);
