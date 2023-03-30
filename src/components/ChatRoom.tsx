import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuth } from "near-social-bridge/auth";
import {
  Box,
  Heading,
  IconButton,
  Input,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { RiSendPlaneLine } from "react-icons/ri";
import truncate from "../utils/truncate";
import Message from "../components/Message";
import Loading from "../components/Loading";
import sendMessage from "../services/sendMessage";
import getRoomData, { RoomMessage } from "../services/getRoomData";
import useTypedNavigation from "../hooks/useTypedNavigator";

type Props = {
  roomId: string;
  showLeaveButton?: boolean;
};

const ChatRoom: React.FC<Props> = ({ roomId, showLeaveButton }) => {
  const [currentRoomMessages, setCurrentRoomMessages] = useState<RoomMessage[]>(
    []
  );
  const [pendingMessages, setPendingMessages] = useState<RoomMessage[]>([]);
  const [message, setMessage] = useState("");
  const [ready, setReady] = useState(false);
  const messageBoxRef = useRef<any>();
  const auth = useAuth();
  const navigation = useTypedNavigation();

  // Auto scrolling
  const scrollMessageBoxToBottom = useCallback(() => {
    if (messageBoxRef.current) {
      const messageBox = messageBoxRef.current;
      messageBox.scrollTo({
        top: messageBox.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [messageBoxRef]);

  // Load initial messages
  useEffect(() => {
    getRoomData({ roomId }).then((roomData) => {
      setCurrentRoomMessages(roomData.messages ?? []);
      setPendingMessages([]);
      scrollMessageBoxToBottom();

      setReady(true);
    });
  }, [roomId, scrollMessageBoxToBottom]);

  useEffect(() => {
    setReady(false);
  }, [roomId]);

  // Listen to messages
  useEffect(() => {
    const subscription = setInterval(() => {
      if (roomId) {
        getRoomData({ roomId }).then((roomData) => {
          // Update the messages list only if there are new messages
          if (roomData.messages?.length !== currentRoomMessages.length) {
            setCurrentRoomMessages(roomData.messages ?? []);

            // Clean up the pending messages
            setPendingMessages([]);
            scrollMessageBoxToBottom();
          }
        });
      }
    }, 5000);

    return () => {
      clearInterval(subscription);
    };
  }, [roomId, currentRoomMessages, scrollMessageBoxToBottom]);

  // Send message handler
  const sendMessageClick = async () => {
    if (message) {
      const messageCopy = message;

      // Populate the pending messages to display in advance
      setPendingMessages([
        ...pendingMessages,
        {
          accountId: auth.user?.accountId!,
          blockHeight: Math.random() * 999999,
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

  // Truncated room name
  const roomName = roomId ? truncate(roomId.replaceAll("-", " "), 25) : "";

  // Last messages on the bottom
  const sortedMessages = useMemo(
    () => currentRoomMessages.sort((m1, m2) => m1.blockHeight - m2.blockHeight),
    [currentRoomMessages]
  );

  // Scroll message box to the bottom as soon as the box is rendered
  useEffect(() => {
    if (messageBoxRef.current) {
      scrollMessageBoxToBottom();
    }
  }, [messageBoxRef, scrollMessageBoxToBottom]);

  useEffect(() => {
    scrollMessageBoxToBottom();
  }, [pendingMessages, scrollMessageBoxToBottom]);

  // Force go to bottom after some images are loaded
  useEffect(() => {
    setTimeout(scrollMessageBoxToBottom, 1500);
  }, [roomId, scrollMessageBoxToBottom]);

  const goToHome = () => {
    navigation.push("Home");
  };

  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems="center">
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
          {showLeaveButton && (
            <Button size="sm" colorScheme="teal" onClick={goToHome}>
              Leave
            </Button>
          )}
        </Heading>
        {ready ? (
          <>
            {/* Messages */}
            <Box
              ref={messageBoxRef}
              bg="teal.50"
              p={4}
              overflowX="scroll"
              height={604}
              background="#F7F8FA"
            >
              {sortedMessages.length === 0 && (
                <Text
                  color="#888888"
                  textAlign="center"
                  p={4}
                  w="248px"
                  margin="auto"
                >
                  No messages yet. Be the first to send a "Hi!"
                </Text>
              )}
              {sortedMessages.map((message) => (
                <Message key={message.blockHeight} message={message} />
              ))}

              {pendingMessages.map((message) => (
                <Message key={message.blockHeight} message={message} />
              ))}
            </Box>

            {/* Input */}
            <Box
              display="flex"
              alignItems="center"
              p={4}
              bg="#eaeaea"
              justifyContent="space-between"
            >
              <Input
                _hover={{ borderColor: "#eaeaea" }}
                _focus={{ borderColor: "#eaeaea" }}
                _active={{ borderColor: "#eaeaea" }}
                outline="none"
                borderColor="#eaeaea"
                bg="#eaeaea"
                placeholder="Type your message here..."
                fontSize="sm"
                w="80%"
                fontWeight="600"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessageClick();
                  }
                }}
              />
              <IconButton
                aria-label="Send message"
                colorScheme="teal.500"
                bg="teal"
                h="1.75rem"
                size="xs"
                fontSize="22px"
                width="42px"
                height="42px"
                borderRadius={999}
                onClick={sendMessageClick}
                icon={<Icon as={RiSendPlaneLine} color="white" />}
              />
            </Box>
          </>
        ) : (
          <Loading height={400} />
        )}
      </Box>
    </Box>
  );
};

export default ChatRoom;
