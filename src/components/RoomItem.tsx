import { Avatar, Box, Text } from "@chakra-ui/react";
import normalizeRoomName from "../utils/normalizeRoomName";

type Props = {
  name: string;
  onSelectRoom: (roomId: string) => void;
};

const RoomItem: React.FC<Props> = ({ name, onSelectRoom }) => {
  const normalizedName = normalizeRoomName(name);

  return (
    <Box
      cursor="pointer"
      display="flex"
      alignItems="center"
      bg="gray.600"
      p={2}
      borderRadius={6}
      _hover={{ backgroundColor: "#38b2ac68" }}
      onClick={() => onSelectRoom(name)}
    >
      <Avatar
        bg="gray.50"
        textColor="gray.600"
        size="sm"
        name={normalizedName}
      />
      <Text color="white" ml={4} as="b">
        {normalizedName}
      </Text>
    </Box>
  );
};

export default RoomItem;
