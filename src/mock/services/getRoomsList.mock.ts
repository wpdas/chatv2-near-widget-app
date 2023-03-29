import { roomsList } from "../shared";

const getRoomsListMock = () => {
  return {
    // Must be a new obj
    roomsList: [...roomsList],
  };
};

export default getRoomsListMock;
