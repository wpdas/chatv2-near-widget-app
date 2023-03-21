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
import useTypedNavigation from "../hooks/useTypedNavigator";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const filterText = (text: string) =>
  text
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s/g, "-")
    .toLowerCase();

const NewRoomModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [roomId, setRoomId] = useState("");
  const navigation = useTypedNavigation();

  const onCreateHandler = () => {
    navigation.push("CreateRoom", {
      roomId,
    });
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
            onChange={(e) => setRoomId(filterText(e.target.value))}
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
