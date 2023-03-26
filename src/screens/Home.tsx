import { useCallback, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { PreHomeScreenProps } from "../routes/NavigationProps";
import Container from "../components/Container";
import Content from "../components/Content";
import NewRoomModal from "../components/NewRoomModal";
import RecentRooms from "../components/RecentRooms";
import ChatRoom from "../components/ChatRoom";
import useRoomsList from "../hooks/useRoomsList";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  const [roomId, setRoomId] = useState("near-social-community");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState("");
  const { reFetch } = useRoomsList();

  const onErrorCreatingNewRoom = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  const onSelectRoomHandler = useCallback((selectedRoomId: string) => {
    setRoomId(selectedRoomId);
  }, []);

  const onCompleteCreateRoom = useCallback(
    (roomId: string) => {
      // Update rooms list
      reFetch();
      setIsReady(true);
      setRoomId(roomId);
    },
    [reFetch]
  );

  return (
    <Container>
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Content direction="row">
        <RecentRooms
          onSelectRoom={onSelectRoomHandler}
          onClickCreateRoom={onOpen}
        />
        {isReady ? (
          <ChatRoom roomId={roomId} />
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
