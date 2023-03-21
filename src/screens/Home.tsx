import { useEffect, useState } from "react";
import { useNavigation } from "near-social-bridge/navigation";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavigationProps, PreHomeScreenProps } from "../routes/NavigationProps";
import getUserInfo, { GetUserResponse } from "../services/getUserInfo";
import Container from "../components/Container";
import Content from "../components/Content";
import NewRoomModal from "../components/NewRoomModal";
import Header from "../components/Header";

const Home: React.FC<PreHomeScreenProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userInfo, setUserInfo] = useState<GetUserResponse>();
  const [roomId, setRoomId] = useState("");

  // You can also get this from this screen props
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Get user info - service
    // getUserInfo().then((response) => {
    //   setUserInfo(response);
    // });
  }, []);

  const goToProfileHandler = () => {
    // Go to Profile page passing some props
    navigation.push("Room", {
      userName: userInfo?.profileInfo?.name || "Not logged in",
      ipfsCidAvatar: userInfo?.profileInfo?.image.ipfs_cid || undefined,
    });
  };

  return (
    <Container>
      <Header onOpenCreateRoomModal={onOpen} />
      <Content>
        <Text size="xs" mt={16} color="gray.700" maxW="sm" textAlign="center">
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
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => navigation.push("Room", {})}
                >
                  Join
                </Button>
              </InputRightAddon>
            )}
          </InputGroup>
        </Stack>
      </Content>
      <NewRoomModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
};

export default Home;
