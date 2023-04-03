import { useCallback, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Spinner,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { PreHomeScreenProps } from "../routes/NavigationProps";
import Container from "../components/Container";
import Content from "../components/Content";
import NewRoomModal from "../components/NewRoomModal";
import RecentRooms from "../components/RecentRooms";
import ChatRoom from "../components/ChatRoom";
import useTypedInitialPayload from "../hooks/useTypedInitialPayload";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const { room } = useTypedInitialPayload();
  const [roomId, setRoomId] = useState(room || "near-social-community");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onErrorCreatingNewRoom = (error: string) => {
    setError(error);
    setIsReady(true);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const onSelectRoomHandler = useCallback(
    (selectedRoomId: string) => {
      setRoomId(selectedRoomId);

      // Go to Mobile Chat Room
      if (!isLargerThan700) {
        navigation.push("MobileChatRoom", { roomId: selectedRoomId });
      }
    },
    [isLargerThan700, navigation]
  );

  const onCompleteCreateRoom = useCallback((roomId: string) => {
    setIsReady(true);
    setRoomId(roomId);
  }, []);

  const onShareRoomHandler = useCallback(() => {
    setSuccessMessage("Room link copied to clipboard!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
  }, []);

  return (
    <Container>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      {successMessage && (
        <Alert status="success">
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      <Content direction="row">
        <RecentRooms
          onSelectRoom={onSelectRoomHandler}
          onClickCreateRoom={onOpen}
        />
        {isLargerThan700 && (
          <>
            {isReady ? (
              <ChatRoom roomId={roomId} onShareSuccess={onShareRoomHandler} />
            ) : (
              <Box w="100%" display="flex">
                <Spinner
                  margin="auto"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              </Box>
            )}
          </>
        )}
      </Content>
      <NewRoomModal
        isOpen={isOpen}
        onClose={onClose}
        onCreateClick={() => setIsReady(false)}
        onComplete={onCompleteCreateRoom}
        onError={onErrorCreatingNewRoom}
      />
    </Container>
  );
};

export default Home;
