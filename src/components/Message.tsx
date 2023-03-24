import { Avatar, Box, Text } from "@chakra-ui/react";
import { useAuth } from "near-social-bridge/auth";
import { RoomMessage } from "../services/getRoomData";

type Props = {
  message: RoomMessage;
};

const IPFS_NEAR_SOCIAL_THUMBNAIL_URL =
  "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/";

const Message: React.FC<Props> = ({ message }) => {
  const auth = useAuth();
  const itsMe = auth.user?.accountId === message.accountId;
  const avatarUrl = message.value.userAvatarImage
    ? `${IPFS_NEAR_SOCIAL_THUMBNAIL_URL}${message.value.userAvatarImage}`
    : undefined;

  if (itsMe) {
    return (
      <Box display="flex" flexDirection="column" mb={8}>
        <Box display="flex" alignItems="center">
          <Avatar name="Dan Abrahmov" src={avatarUrl} />
          <Text textTransform="capitalize" as="b" fontSize="sm" ml={4}>
            {message.value.userName}
          </Text>
        </Box>
        <Text
          fontSize="sm"
          fontWeight="normal"
          color="gray.700"
          mt={2}
          bg="#9fd3cdeb"
          w="fit-content"
          p={2}
          borderRadius={8}
          maxW="85%"
        >
          {message.value.text}
        </Text>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="end" mb={8}>
      <Box display="flex" alignItems="center" flexDirection="row-reverse">
        <Avatar name="Dan Abrahmov" src={avatarUrl} />
        <Text textTransform="capitalize" as="b" fontSize="sm" mr={4}>
          {message.value.userName}
        </Text>
      </Box>
      <Text
        fontSize="sm"
        fontWeight="normal"
        color="gray.700"
        mt={2}
        bg="#9fd3cdeb"
        w="fit-content"
        p={2}
        borderRadius={8}
        maxW="85%"
      >
        {message.value.text}
      </Text>
    </Box>
  );
};

export default Message;
