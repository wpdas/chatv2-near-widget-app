import { Link, Text } from "@chakra-ui/react";
import isImageUrl from "../utils/isImageUrl";

type Props = {
  text: string;
  itsMe?: boolean;
  onClickLink: (mediaUrl: string) => void;
};

const MessageParagraph: React.FC<Props> = ({ text, itsMe, onClickLink }) => {
  const textComponents = text.split(" ").map((word) => {
    if (isImageUrl(word)) {
      const paths = word.split("/");
      const fileName = paths[paths.length - 1];
      return (
        <Link
          as="b"
          color={itsMe ? "gray.700" : "white"}
          key={word + Date.now()}
          onClick={() => onClickLink(word)}
        >
          {`${fileName} `}
        </Link>
      );
    }
    return `${word} `;
  });

  if (!itsMe) {
    return (
      <Text
        fontSize="sm"
        color="white"
        mt={2}
        bg="gray.700"
        w="fit-content"
        p={4}
        mr={12}
        borderRadius={8}
        borderTopRightRadius={0}
        maxW="85%"
        overflowWrap="anywhere"
      >
        {textComponents}
      </Text>
    );
  }

  return (
    <Text
      fontSize="sm"
      color="gray.700"
      mt={2}
      bg="#EAEAEA"
      w="fit-content"
      p={4}
      ml={12}
      borderRadius={8}
      borderTopLeftRadius={0}
      maxW="85%"
      overflowWrap="anywhere"
    >
      {textComponents}
    </Text>
  );
};

export default MessageParagraph;
