import { request } from "near-social-bridge/request";

interface SendMessageResponse {
  error?: string;
}

interface SendMessagePayload {
  roomId: string;
  message: string;
  userName: string;
  userAvatarImage: string;
  b64Image?: string;
  timestamp?: number;
}

const sendMessage = (payload: SendMessagePayload) => {
  return request<SendMessageResponse>("send-message", {
    roomId: payload.roomId,
    message: {
      userName: payload.userName,
      userAvatarImage: payload.userAvatarImage,
      text: payload.message,
      b64Image: payload.b64Image,
      timestamp: payload.timestamp,
    },
  });
};
export default sendMessage;
