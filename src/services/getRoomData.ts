import request from "near-social-bridge/request";

export interface RoomMessages {
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
  messages?: RoomMessages[];
}

interface GetRoomDataPayload {
  wait?: number;
  roomId: string;
}

// Send a request to Near Social View to get basic user info
const getUserInfo = (payload: GetRoomDataPayload) =>
  request<GetRoomDataResponse>("get-room-data", payload);
export default getUserInfo;

// TODO: Create auth thing (protected routes)
