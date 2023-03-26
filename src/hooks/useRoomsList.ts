import { useContext } from "react";
import { RoomsContext } from "../contexts/RoomsProvider";

const useRoomsList = () => useContext(RoomsContext);
export default useRoomsList;
