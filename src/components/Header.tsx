import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
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
      <Text textAlign="center" color="white">
        built using{" "}
        <Link
          href="https://github.com/wpdas/near-social-bridge"
          target="_blank"
          textDecoration="underline"
          rel="noopener noreferrer"
        >
          near-social-bridge
        </Link>
      </Text>
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
