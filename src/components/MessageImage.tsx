import { Box, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { RiCloseCircleLine } from "react-icons/ri";

type Props = {
  b64Image: string;
  onDelete?: () => void;
};

const MessageImage: React.FC<Props> = ({ b64Image, onDelete }) => {
  return (
    <Box>
      <Tooltip label="remove image" placement="top">
        <IconButton
          position="fixed"
          aria-label="delete"
          colorScheme="teal.500"
          bg="teal"
          h="1.75rem"
          size="xs"
          fontSize="18px"
          width="22px"
          height="24px"
          mt={-2}
          borderRadius={999}
          onClick={onDelete}
          icon={<Icon as={RiCloseCircleLine} color="white" />}
        />
      </Tooltip>
      <div
        style={{
          width: "44px",
          height: "42px",
          backgroundImage: `url(${b64Image})`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
    </Box>
  );
};

export default MessageImage;
