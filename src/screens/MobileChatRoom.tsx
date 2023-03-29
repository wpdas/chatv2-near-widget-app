import { MobileChatRoomScreenProps } from "../routes/NavigationProps";
import ChatRoom from "../components/ChatRoom";

const MobileChatRoom: React.FC<MobileChatRoomScreenProps> = ({ route }) => {
  const { roomId } = route.params;

  return <ChatRoom roomId={roomId} showLeaveButton />;
};

export default MobileChatRoom;
