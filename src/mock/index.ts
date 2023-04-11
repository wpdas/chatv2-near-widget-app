import {
  createMock,
  // mockInitialPayload,
  mockUser,
} from "near-social-bridge/request/mock";
import getRoomDataMock from "./services/getRoomData.mock";
import getRoomsListMock from "./services/getRoomsList.mock";
import registerNewRoomMock from "./services/registerNewRoom.mock";
import sendMessageMock from "./services/sendMessage.mock";
import { userMockInfo } from "./shared";

const mock = () => {
  // Mock initial payload
  // mockInitialPayload({
  //   mainChatURL: 'http://localhost:3001/#/view/ChatV2',
  //   room: "dragon-ball-z",
  // });

  // Mock user
  mockUser(userMockInfo);

  // Mock requests
  createMock("get-room-data", getRoomDataMock);
  createMock("get-rooms-list", getRoomsListMock);
  createMock("send-message", sendMessageMock);
  createMock("register-new-room", registerNewRoomMock);
  // createMock("set-clipboard-text", () => ({}));
};

export default mock;
