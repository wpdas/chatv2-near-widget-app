import { createContext, useCallback, useEffect, useState } from "react";
import getRoomsList from "../services/getRoomsList";

type RoomsContextProps = {
  roomsList: string[];
  reFetch: () => void;
};

const defaultValue: RoomsContextProps = {
  roomsList: [],
  reFetch: () => {
    throw new Error("reFetch must be defined");
  },
};

export const RoomsContext = createContext(defaultValue);

const RoomsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [roomsList, setRoomsList] = useState<string[]>([]);

  const reFetch = useCallback(() => {
    getRoomsList().then((response) => {
      setRoomsList(response.roomsList);
    });
  }, []);

  useEffect(() => {
    reFetch();
  }, [reFetch]);

  return (
    <RoomsContext.Provider value={{ roomsList, reFetch }}>
      {children}
    </RoomsContext.Provider>
  );
};

export default RoomsProvider;
