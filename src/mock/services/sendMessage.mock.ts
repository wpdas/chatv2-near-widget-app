import { messagesByRoomId, userMockInfo } from "../shared";

const sendMessageMock = (payload: any) => {
  const messagesList = messagesByRoomId[payload.roomId];
  const hasPreviousMessage = messagesList.length > 0;
  messagesByRoomId[payload.roomId].push({
    accountId: userMockInfo.accountId,
    blockHeight: hasPreviousMessage
      ? messagesList[messagesList.length - 1].blockHeight + 1
      : 0,
    value: {
      userName: payload.message.userName,
      userAvatarImage: payload.message.userAvatarImage,
      text: payload.message.text,
      b64Image: payload.message.b64Image,
      timestamp: payload.message.timestamp,
    },
  });
};

export default sendMessageMock;
