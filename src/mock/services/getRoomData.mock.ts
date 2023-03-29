import { GetRoomDataPayload } from "../../services/getRoomData";
import { messagesByRoomId, roomsList } from "../shared";

const getRoomDataMock = (payload: GetRoomDataPayload) => {
  if (roomsList.includes(payload.roomId)) {
    return {
      // Must be a new obj
      messages: [...messagesByRoomId[payload.roomId]],
    };
  }

  return { error: "room not found" };
};

export default getRoomDataMock;
