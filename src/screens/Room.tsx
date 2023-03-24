import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useMediaQuery,
} from "@chakra-ui/react";
import { RoomScreenProps } from "../routes/NavigationProps";
import truncate from "../utils/truncate";
import Message from "../components/Message";
import sendMessage from "../services/sendMessage";
import getRoomData, { RoomMessage } from "../services/getRoomData";
import { useAuth } from "near-social-bridge/auth";

const Room: React.FC<RoomScreenProps> = ({ navigation, route }) => {
  const { roomId, roomMessages } = route.params;
  const [currentRoomMessages, setCurrentRoomMessages] = useState<RoomMessage[]>(
    roomMessages || []
  );

  // Truncated room name
  const roomName = roomId ? truncate(roomId.replaceAll("-", " "), 25) : "";
  // Last messages on the bottom
  const sortedMessages = useMemo(
    () => currentRoomMessages.sort((m1, m2) => m1.blockHeight - m2.blockHeight),
    [currentRoomMessages]
  );

  const [message, setMessage] = useState("");
  const [pendingMessages, setPendingMessages] = useState<RoomMessage[]>([]);
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const messageBoxRef = useRef<any>();
  const auth = useAuth();

  const scrollMessageBoxToBottom = useCallback(() => {
    if (messageBoxRef.current) {
      const messageBox = messageBoxRef.current;
      messageBox.scrollTo(0, messageBox.scrollHeight);
    }
  }, [messageBoxRef]);

  // Listem to messages
  useEffect(() => {
    const subscription = setInterval(() => {
      if (roomId) {
        getRoomData({ roomId }).then((roomData) => {
          setCurrentRoomMessages(roomData.messages ?? []);

          // If there are new messages, clean up the pending messages
          if (roomData.messages?.length !== currentRoomMessages.length) {
            setPendingMessages([]);
            scrollMessageBoxToBottom();
          }
        });
      }
    }, 5000);

    return () => {
      clearInterval(subscription);
    };
  }, [roomId, currentRoomMessages.length, scrollMessageBoxToBottom]);

  const goToHome = () => {
    navigation.push("Home");
  };

  const sendMessageClick = async () => {
    if (message) {
      const messageCopy = message;

      // Populate the pending messages to display in advance
      // TODO: quando atualizar as msgs, remover o pending msgs
      setPendingMessages([
        {
          accountId: auth.user?.accountId!,
          blockHeight: 0,
          value: {
            text: messageCopy,
            userName: auth.user?.profileInfo?.name!,
            userAvatarImage: auth.user?.profileInfo?.image?.ipfs_cid!,
          },
        },
      ]);

      setMessage("");
      const result = await sendMessage({
        roomId,
        message: messageCopy,
        userName: auth.user?.profileInfo?.name!,
        userAvatarImage: auth.user?.profileInfo?.image?.ipfs_cid!,
      });

      if (result?.error) {
        console.error(result.error);
        setPendingMessages([]);
        return;
      }

      scrollMessageBoxToBottom();
    }
  };

  // Scroll message box to the bottom as soon as the box is rendered
  useEffect(() => {
    if (messageBoxRef.current) {
      scrollMessageBoxToBottom();
    }
  }, [messageBoxRef, scrollMessageBoxToBottom]);

  useEffect(() => {
    scrollMessageBoxToBottom();
  }, [pendingMessages, scrollMessageBoxToBottom]);

  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      maxW={isLargerThan800 ? "md" : "100%"}
    >
      <Box w="100%">
        <Heading
          textTransform="capitalize"
          size="lx"
          bg="teal.100"
          textColor="teal.700"
          p={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          Room: {roomName}
          <Button size="sm" colorScheme="teal" onClick={goToHome}>
            Leave
          </Button>
        </Heading>

        {/* Messages */}
        <Box
          ref={messageBoxRef}
          bg="teal.50"
          p={4}
          overflowX="scroll"
          height={604}
          background="url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)"
          backgroundSize="cover"
        >
          {sortedMessages.map((message) => (
            <Message key={message.blockHeight} message={message} />
          ))}

          {pendingMessages.map((message) => (
            <Message key={message.blockHeight} message={message} />
          ))}
        </Box>

        {/* Input */}
        <InputGroup p={4} bg="teal.100">
          <Input
            borderColor="teal.400"
            bg="teal.50"
            placeholder="Message"
            fontSize="sm"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessageClick();
              }
            }}
          />

          <InputRightAddon width="4.5rem" bg="teal" borderColor="teal.400">
            <Button
              colorScheme="teal"
              bg="teal"
              h="1.75rem"
              size="sm"
              onClick={sendMessageClick}
            >
              Send
            </Button>
          </InputRightAddon>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default Room;
