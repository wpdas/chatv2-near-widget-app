import request from "near-social-bridge/request";

export interface RoomMessage {
  accountId: string;
  blockHeight: number;
  value: {
    userName: string;
    userAvatarImage: string;
    text: string;
  };
}

export interface GetRoomDataResponse {
  error?: string;
  messages?: RoomMessage[];
}

interface GetRoomDataPayload {
  roomId: string;
}

// Send a request to Near Social View to get basic user info
const getRoomData = (payload: GetRoomDataPayload) =>
  request<GetRoomDataResponse>("get-room-data", payload);
export default getRoomData;
