import React, { useState } from "react";
import { RoomScreenProps } from "../routes/NavigationProps";
import Container from "../components/Container";
import Header from "../components/Header";
import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";

const Room: React.FC<RoomScreenProps> = ({ navigation, route }) => {
  const { ipfsCidAvatar, userName } = route.params;
  const avatarImage = ipfsCidAvatar
    ? `https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/${route.params.ipfsCidAvatar}`
    : "./logo192.png";

  const [message, setMessage] = useState("");

  const goToHome = () => {
    navigation.push("Home");
  };

  const sendMessage = () => {
    if (message) {
      // ....
    }
  };

  return (
    <Container>
      <Header hideButtons />
      <Box w="100%" maxW="md" mt={12}>
        <Heading
          size="lx"
          bg="teal.100"
          borderTopRadius={8}
          textColor="teal.700"
          p={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Room Name Here
          <Button size="sm" colorScheme="teal" onClick={goToHome}>
            Leave
          </Button>
        </Heading>
        <Box bg="teal.50" p={4}>
          {/* Message - mine*/}
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text as="b" fontSize="sm" ml={4}>
                Dan Abrahmov
              </Text>
            </Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              mt={2}
              bg="blue.700"
              w="fit-content"
              p={2}
              borderRadius={8}
            >
              Mensagem aqui
            </Text>
          </Box>

          {/* Message - them*/}

          <Box display="flex" flexDirection="column" alignItems="end">
            <Box display="flex" alignItems="center" flexDirection="row-reverse">
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <Text as="b" fontSize="sm" mr={4}>
                Dan Abrahmov
              </Text>
            </Box>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="white"
              mt={2}
              bg="blue.700"
              w="fit-content"
              p={2}
              borderRadius={8}
            >
              Mensagem aqui
            </Text>
          </Box>
        </Box>

        {/* Input */}
        <InputGroup p={4} bg="teal.100">
          <Input
            borderColor="teal.400"
            bg="teal.50"
            placeholder="Message"
            fontSize="sm"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <InputRightAddon width="4.5rem" bg="teal" borderColor="teal.400">
            <Button
              colorScheme="teal"
              bg="teal"
              h="1.75rem"
              size="sm"
              onClick={() => navigation.push("Room", {})}
            >
              Send
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </Container>
  );
};

export default Room;
