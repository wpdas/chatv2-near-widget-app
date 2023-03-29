import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useRoomsList from "../hooks/useRoomsList";
import getRoomData from "../services/getRoomData";
import registerNewRoom from "../services/registerNewRoom";
import roomNameFormater from "../utils/roomNameFormater";

type Props = {
  isOpen: boolean;
  onCreateClick?: () => void;
  onComplete?: (roomId: string) => void;
  onClose: () => void;
  onError: (errorMsg: string) => void;
};

const NewRoomModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCreateClick,
  onComplete,
  onError,
}) => {
  const [roomId, setRoomId] = useState("");
  const { updateRoomsList } = useRoomsList();

  const onCreateHandler = () => {
    if (onCreateClick) {
      onCreateClick();
    }

    getRoomData({ roomId }).then(async (roomData) => {
      // Check if room already exists.
      if (roomData.messages && roomData.messages.length > 0) {
        if (onError) {
          onError("This room already exists.");
        }
        onClose();
        return;
      }

      const registerResult = await registerNewRoom({ roomId });

      if (registerResult.error) {
        // Error: Don't pass back the new roomId
        if (onError) {
          onError(registerResult.error);
        }
      } else {
        // Update rooms list
        updateRoomsList(registerResult.roomsList);

        // Success: Pass back the new roomId
        if (onComplete) {
          onComplete(roomId);
        }
      }
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text size="xs">
            Insert the name you want to give to your new room
          </Text>
          <Input
            mt={2}
            mb={2}
            placeholder="Room id"
            maxW="md"
            onChange={(e) => setRoomId(roomNameFormater(e.target.value))}
          />
          {roomId && (
            <Text as="b" fontSize="xs" color="gray.700">
              Your Room Id: {roomId}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="teal" onClick={onCreateHandler}>
            Create Room
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewRoomModal;
