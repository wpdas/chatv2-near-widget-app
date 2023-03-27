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
    getRoomsList()
      .then((response) => {
        setRoomsList(response.roomsList);
      })
      .catch(() => {
        // If error: set default rooms
        console.warn("Error getting rooms list. Using default rooms now!");
        setRoomsList([
          "near-social-community",
          "bos",
          "satori",
          "dragon-ball-z",
          "sala-teste-1",
        ]);
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
