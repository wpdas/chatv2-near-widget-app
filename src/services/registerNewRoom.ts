import request from "near-social-bridge/request";

interface RegisterNewRoomResponse {
  roomsList: string[];
}

interface RegisterNewRoomPayload {
  roomId: string;
}

const registerNewRoom = (payload: RegisterNewRoomPayload) => {
  return request<RegisterNewRoomResponse>("register-new-room", payload);
};
export default registerNewRoom;
