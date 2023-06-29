import { useEffect, useState } from "react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Link,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Fuse from "fuse.js";

import RoomItem from "./RoomItem";
import useRoomsList from "../hooks/useRoomsList";

type Props = {
  onSelectRoom: (roomId: string) => void;
  onClickCreateRoom?: () => void;
};

const RecentRooms: React.FC<Props> = ({ onSelectRoom, onClickCreateRoom }) => {
  const { roomsList } = useRoomsList();
  const [searchText, setSearchText] = useState("");
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
  const [filteredRoomsList, setFilteredRoomsList] = useState<string[]>([]);

  useEffect(() => {
    if (searchText) {
      const fuse = new Fuse(roomsList, { includeScore: true });
      const result = fuse.search(searchText).map((item) => item.item);
      setFilteredRoomsList(result);
    }
  }, [roomsList, searchText]);

  return (
    <Stack
      bg="gray.900"
      width={isLargerThan700 ? "500px" : "100%"}
      alignItems="center"
      height={734}
    >
      <Stack alignItems="center" width="100%" height="100%">
        <Box
          p={4}
          display="flex"
          justifyContent="space-between"
          w="100%"
          alignItems="center"
        >
          <Heading size="sm" color="white">
            CHAT ROOMS
          </Heading>

          <IconButton
            colorScheme="gray"
            color="gray.500"
            borderRadius={999}
            aria-label="Search database"
            bg="white"
            height={6}
            onClick={onClickCreateRoom}
            icon={<AddIcon fontSize={12} />}
          />
        </Box>
        <Stack w="100%" pl={4} pr={4}>
          <InputGroup borderColor="gray.400">
            <InputLeftAddon
              bg="gray.400"
              children={<SearchIcon color="white" />}
            />
            <Input
              _hover={{ borderColor: "gray.400" }}
              _focus={{ borderColor: "gray.400" }}
              _active={{ borderColor: "gray.400" }}
              outline="none"
              bg="gray.400"
              color="white"
              textColor="white"
              _placeholder={{ color: "white" }}
              fontWeight={500}
              placeholder="Search Here..."
              onChange={(e) => setSearchText(e.target.value)}
            />
          </InputGroup>
        </Stack>
        {roomsList.length > 0 ? (
          <Stack w="100%" pl={4} pr={4} overflow="auto" height={538} pt={4}>
            {searchText ? (
              <>
                {filteredRoomsList.map((roomName) => (
                  <RoomItem
                    key={roomName}
                    name={roomName}
                    onSelectRoom={onSelectRoom}
                  />
                ))}
              </>
            ) : (
              <>
                {roomsList.map((roomName) => (
                  <RoomItem
                    key={roomName}
                    name={roomName}
                    onSelectRoom={onSelectRoom}
                  />
                ))}
              </>
            )}
          </Stack>
        ) : (
          // Skeleton
          <Box p={2} w="86%" display="flex" alignItems="center">
            <SkeletonCircle size="8" speed={0.4} mt={4} />
            <SkeletonText
              w="80%"
              ml={4}
              mt="4"
              noOfLines={2}
              speed={0.4}
              spacing="2"
              skeletonHeight="3"
            />
          </Box>
        )}
      </Stack>

      {/* About the library */}
      <Box
        display="flex"
        w="100%"
        bg="gray.400"
        alignSelf="end"
        height={79}
        p={4}
        justifyContent="center"
        alignItems="center"
      >
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
      </Box>
    </Stack>
  );
};

export default RecentRooms;
