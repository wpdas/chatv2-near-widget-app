import { useEffect, useState } from "react";
import { Avatar, Box, Image, Text } from "@chakra-ui/react";
import { useAuth } from "near-social-bridge/auth";
import ImageViewer from "react-simple-image-viewer";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { RoomMessage } from "../services/getRoomData";
import extractUrlFromString from "../utils/extractUrlFromString";
import isImageUrl from "../utils/isImageUrl";
import MessageParagraph from "./MessageParagraph";
import truncate from "../utils/truncate";

type Props = {
  message: RoomMessage;
  timestamp?: number;
};

// Create formatter (English).
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const IPFS_NEAR_SOCIAL_THUMBNAIL_URL =
  "https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/";

const Message: React.FC<Props> = ({ message }) => {
  const auth = useAuth();
  const itsMe = auth.user?.accountId === message.accountId;
  const hasAvatarImage = !!message.value.userAvatarImage;

  // Get regular image url or ipfs stored image url
  const avatarUrl =
    hasAvatarImage && message.value.userAvatarImage.includes("http")
      ? message.value.userAvatarImage
      : message.value.userAvatarImage
      ? `${IPFS_NEAR_SOCIAL_THUMBNAIL_URL}${message.value.userAvatarImage}`
      : undefined;

  const [medias, setMedias] = useState<string[]>([]);
  const [viewImageUrl, setViewImageUrl] = useState("");

  // Check medias
  useEffect(() => {
    const urls = extractUrlFromString(message.value.text);
    let urlImageMedias: string[] = [];

    if (urls) {
      urlImageMedias = urls.filter((url) => {
        return isImageUrl(url);
      });
    }

    // Check base64 uploaded images
    if (message.value.b64Image) {
      setMedias([...urlImageMedias, message.value.b64Image]);
      return;
    }

    setMedias(urlImageMedias || []);
  }, [message.value.text, message.value.b64Image]);

  const onClickImageMedia = (mediaUrl: string) => {
    setViewImageUrl(mediaUrl);
  };

  const onCloseImageView = () => {
    setViewImageUrl("");
  };

  if (itsMe) {
    return (
      <Box display="flex" flexDirection="column" mb={8}>
        <Box display="flex" alignItems="center">
          <Avatar
            name={message.value.userName || message.accountId}
            src={avatarUrl}
            bg="gray.500"
            color="white"
          />
          <Text
            ml={4}
            textTransform="capitalize"
            as="b"
            fontSize="sm"
            color="#515151"
          >
            {truncate(message.value.userName || message.accountId, 25)}
          </Text>
          {message.value.timestamp && (
            <Text ml={1}>- {timeAgo.format(message.value.timestamp)}</Text>
          )}
        </Box>
        <MessageParagraph
          text={message.value.text}
          onClickLink={onClickImageMedia}
          itsMe
        />

        {/* Show images (medias) if found */}
        {medias.length > 0 && (
          <Box ml={10} display="flex" flexWrap="wrap">
            {medias.map((media) => (
              <Image
                borderRadius={12}
                cursor="pointer"
                src={media}
                key={media}
                mt={2}
                ml={2}
                maxHeight={200}
                onClick={() => onClickImageMedia(media)}
              />
            ))}
          </Box>
        )}
        {viewImageUrl && (
          <ImageViewer
            src={[viewImageUrl]}
            currentIndex={0}
            onClose={onCloseImageView}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
            }}
            closeOnClickOutside={true}
          />
        )}
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="end" mb={8}>
      <Box display="flex" alignItems="center" flexDirection="row-reverse">
        <Avatar
          name={message.value.userName || message.accountId}
          src={avatarUrl}
          bg="gray.500"
          color="white"
        />
        {message.value.timestamp ? (
          <Text mr={4} ml={1}>
            - {timeAgo.format(message.value.timestamp)}
          </Text>
        ) : (
          <Text mr={4} />
        )}
        <Text textTransform="capitalize" as="b" fontSize="sm" color="#515151">
          {truncate(message.value.userName || message.accountId, 25)}
        </Text>
      </Box>
      <MessageParagraph
        text={message.value.text}
        onClickLink={onClickImageMedia}
      />

      {/* Show images (medias) if found */}
      {medias.length > 0 && (
        <Box mr={10} display="flex" flexDirection="row-reverse" flexWrap="wrap">
          {medias.map((media) => (
            <Image
              borderRadius={12}
              cursor="pointer"
              src={media}
              key={media}
              mt={2}
              mr={2}
              maxHeight={200}
              onClick={() => onClickImageMedia(media)}
            />
          ))}
        </Box>
      )}
      {viewImageUrl && (
        <ImageViewer
          src={[viewImageUrl]}
          currentIndex={0}
          onClose={onCloseImageView}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      )}
    </Box>
  );
};

export default Message;
