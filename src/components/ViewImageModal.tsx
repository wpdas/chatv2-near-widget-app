import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
};

const ViewImageModal: React.FC<Props> = ({ isOpen, imageUrl, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent w="80%" h="572px" minHeight="572px" mt="6%">
        <ModalCloseButton />
        <ModalBody>
          <Image
            cursor="pointer"
            src={imageUrl}
            ml={2}
            height="552px"
            margin="auto"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewImageModal;
