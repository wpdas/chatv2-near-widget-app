import { useInitialPayload } from "near-social-bridge/hooks";

type InitialPayloadProps = {
  mainChatURL?: string;
  room?: string; // auto join a specific room
};

const useTypedInitialPayload = () => useInitialPayload<InitialPayloadProps>();
export default useTypedInitialPayload;
