import { Box, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Box display="flex" w="100%" justifyContent="center" pt={250}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
