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
  Stack,
  Tooltip,
  useMediaQuery,
} from "@chakra-ui/react";
// import { RiSendPlaneFill, RiImageAddFill, RiShareFill } from "react-icons/ri";
import { RiSendPlaneFill, RiImageAddFill } from "react-icons/ri";
import truncate from "../utils/truncate";
import Message from "../components/Message";
import Loading from "../components/Loading";
import sendMessage from "../services/sendMessage";
import getRoomData, { RoomMessage } from "../services/getRoomData";
import useTypedNavigation from "../hooks/useTypedNavigator";
// import useTypedInitialPayload from "../hooks/useTypedInitialPayload";
import useRoomsList from "../hooks/useRoomsList";
import { useFilePicker } from "use-file-picker";
import resizeImage from "../utils/resizeImage";
import MessageImage from "./MessageImage";
// import setClipboardText from "../services/setClipboardText";

type Props = {
  roomId: string;
  showLeaveButton?: boolean;
  onShareSuccess?: () => void;
};

const ChatRoom: React.FC<Props> = ({
  roomId,
  showLeaveButton,
  // onShareSuccess,
}) => {
  const [currentRoomId, setCurrentRoomId] = useState(roomId);
  const [currentRoomMessages, setCurrentRoomMessages] = useState<RoomMessage[]>(
    []
  );
  const [pendingMessages, setPendingMessages] = useState<RoomMessage[]>([]);
  const [message, setMessage] = useState("");
  const { ready: isRoomsReady, roomsList } = useRoomsList();
  const [ready, setReady] = useState(false);
  const messageBoxRef = useRef<any>();
  const auth = useAuth();
  // const { mainDomain } = useTypedInitialPayload();
  const navigation = useTypedNavigation();
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: "image/*",
    multiple: false,
    readAs: "DataURL",
  });
  const [b64ImageToSend, setB64ImageToSend] = useState<string | null>(null);
  const [isLargerThan388] = useMediaQuery("(min-width: 388px)");

  // Check if room exists in the list, case not, set the default one
  useEffect(() => {
    if (isRoomsReady) {
      if (!roomsList.includes(roomId)) {
        setCurrentRoomId("near-social-community");
        return;
      }
      setCurrentRoomId(roomId);
    }
  }, [isRoomsReady, roomsList, roomId, currentRoomId]);

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
    getRoomData({ roomId: currentRoomId }).then((roomData) => {
      setCurrentRoomMessages(roomData.messages ?? []);
      setPendingMessages([]);
      scrollMessageBoxToBottom();

      setReady(true);
    });
  }, [currentRoomId, scrollMessageBoxToBottom]);

  useEffect(() => {
    setReady(false);
  }, [currentRoomId]);

  // Listen to messages
  useEffect(() => {
    const subscription = setInterval(() => {
      if (currentRoomId) {
        getRoomData({ roomId: currentRoomId }).then((roomData) => {
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
  }, [currentRoomId, currentRoomMessages, scrollMessageBoxToBottom]);

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
            b64Image: b64ImageToSend || undefined,
          },
        },
      ]);

      setMessage("");
      setB64ImageToSend(null);
      const result = await sendMessage({
        roomId: currentRoomId,
        message: messageCopy,
        userName: auth.user?.profileInfo?.name!,
        userAvatarImage: auth.user?.profileInfo?.image?.ipfs_cid!,
        b64Image: b64ImageToSend || undefined,
      });

      clear(); // image data

      if (result?.error) {
        console.error(result.error);
        setPendingMessages([]);
        return;
      }

      scrollMessageBoxToBottom();
    }
  };

  // Truncated room name
  const roomName = currentRoomId
    ? truncate(currentRoomId.replaceAll("-", " "), isLargerThan388 ? 25 : 10)
    : "";

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
  }, [currentRoomId, scrollMessageBoxToBottom]);

  const goToHome = () => {
    navigation.push("Home");
  };

  // Image upload
  useEffect(() => {
    if (!!filesContent[0]) {
      resizeImage(filesContent[0].content).then((imageData) =>
        setB64ImageToSend(imageData)
      );
    }
  }, [filesContent]);

  // const onShareClick = () => {
  //   setClipboardText({ text: `${mainDomain}/?room=${currentRoomId}` }).then(
  //     () => {
  //       if (onShareSuccess) {
  //         onShareSuccess();
  //       }
  //     }
  //   );
  // };

  const onDeleteImageToSend = () => {
    setB64ImageToSend(null);
    clear(); // image
  };

  return (
    <Box w="100%" display="flex" flexDirection="column" alignItems="center">
      <Box w="100%">
        <Box
          p={4}
          display="flex"
          bg="teal.100"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            textTransform="capitalize"
            size="lx"
            textColor="teal.700"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            Room: {roomName}
          </Heading>
          <Box>
            {/* {mainDomain && (
              <Tooltip label="share room" placement="bottom">
                <IconButton
                  aria-label="Share room"
                  colorScheme="teal.500"
                  bg="teal"
                  h="1.75rem"
                  size="xs"
                  fontSize="18px"
                  width="32px"
                  height="32px"
                  borderRadius={999}
                  onClick={onShareClick}
                  icon={<Icon as={RiShareFill} color="white" />}
                />
              </Tooltip>
            )} */}

            {showLeaveButton && (
              <Button ml={2} size="sm" colorScheme="blue" onClick={goToHome}>
                Leave
              </Button>
            )}
          </Box>
        </Box>

        {ready && isRoomsReady ? (
          <>
            {/* Messages */}
            <Box
              ref={messageBoxRef}
              bg="teal.50"
              p={4}
              overflowX="auto"
              height={596}
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
              <Stack direction="row">
                {b64ImageToSend && (
                  <MessageImage
                    b64Image={b64ImageToSend}
                    onDelete={onDeleteImageToSend}
                  />
                )}

                {!b64ImageToSend && (
                  <Tooltip label="upload image" placement="top">
                    <IconButton
                      aria-label="Send image"
                      colorScheme="teal.500"
                      bg="teal"
                      h="1.75rem"
                      size="xs"
                      ml={2}
                      fontSize="22px"
                      width="42px"
                      height="42px"
                      borderRadius={999}
                      onClick={openFileSelector}
                      icon={<Icon as={RiImageAddFill} color="white" />}
                    />
                  </Tooltip>
                )}

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
                  icon={<Icon as={RiSendPlaneFill} color="white" />}
                />
              </Stack>
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
