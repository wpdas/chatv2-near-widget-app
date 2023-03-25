import { useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PreHomeScreenProps } from "../routes/NavigationProps";
import Container from "../components/Container";
import Content from "../components/Content";
import NewRoomModal from "../components/NewRoomModal";
import Header from "../components/Header";
import getRoomData from "../services/getRoomData";

const Home: React.FC<PreHomeScreenProps> = ({ navigation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isReady, setIsReady] = useState(true);
  const [error, setError] = useState("");
  const [roomId, setRoomId] = useState("");

  const joinClickHandler = () => {
    setIsReady(false);
    getRoomData({ roomId })
      .then((roomData) => {
        setIsReady(true);

        // Show error alert
        if (roomData.error) {
          setError("Room not found!");
          setTimeout(() => {
            setError("");
          }, 3000);
          return;
        }

        // Success: Go to Room page
        navigation.push("Room", {
          roomId,
          roomMessages: roomData.messages!,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onErrorCreatingNewRoom = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  return (
    <Container>
      <Header onOpenCreateRoomModal={onOpen} />
      {error && (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <Content>
        {isReady ? (
          <>
            <Text
              size="xs"
              mt={16}
              color="gray.700"
              maxW="sm"
              textAlign="center"
            >
              Join or create a room to chat with your friends
            </Text>

            <Stack spacing={4} mt={4} width="sm">
              <InputGroup>
                <InputLeftAddon children="Room:" />
                <Input
                  placeholder="type the room id you want to join"
                  maxW="md"
                  onChange={(e) => setRoomId(e.target.value)}
                />
                {roomId && (
                  <InputRightAddon width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={joinClickHandler}>
                      Join
                    </Button>
                  </InputRightAddon>
                )}
              </InputGroup>
            </Stack>
          </>
        ) : (
          <Box mt={250}>
            <Spinner
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
        onComplete={() => setIsReady(true)}
        onError={onErrorCreatingNewRoom}
      />
    </Container>
  );
};

export default Home;
