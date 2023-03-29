import { RegisterNewRoomPayload } from "../../services/registerNewRoom";
import { messagesByRoomId, roomsList, updateMessagesByRoomId } from "../shared";

const registerNewRoomMock = (payload: RegisterNewRoomPayload) => {
  roomsList.push(payload.roomId);

  updateMessagesByRoomId({
    ...messagesByRoomId,
    [payload.roomId]: [],
  });

  return {
    // Must be a new obj
    messages: [...messagesByRoomId[payload.roomId]],
  };
};

export default registerNewRoomMock;
