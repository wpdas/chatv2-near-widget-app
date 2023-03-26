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
    console.log("NOTE: Implantar concurrency");
    // NOTE: This is because a lot of messages were sent all at the same time
    // setTimeout fixed this for now, but I need to implement concurrency
    setTimeout(() => {
      getRoomsList().then((response) => {
        console.log("TI");
        console.log(response);
        setRoomsList(response.roomsList);
      });
    }, 1000); // ou guarda os requests numa lista ate a conexão. Ai dispara eles
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
