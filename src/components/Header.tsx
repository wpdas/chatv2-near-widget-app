import { Box, Button, Heading } from "@chakra-ui/react";
import useTypedNavigation from "../hooks/useTypedNavigator";

type Props = {
  hideButtons?: boolean;
  onOpenCreateRoomModal?: () => void;
};

const Header: React.FC<Props> = ({ hideButtons, onOpenCreateRoomModal }) => {
  const navigation = useTypedNavigation();

  return (
    <Box
      bg="teal.500"
      w="100%"
      display="flex"
      p={4}
      justifyContent="space-between"
    >
      <Heading
        size="md"
        textAlign="center"
        color="white"
        onClick={() => navigation.push("Home")}
        cursor="pointer"
      >
        Near Chat
      </Heading>
      {!hideButtons && (
        <Button
          h="1.75rem"
          size="sm"
          bg="teal.300"
          onClick={onOpenCreateRoomModal}
        >
          Create a new Room
        </Button>
      )}
    </Box>
  );
};

export default Header;
