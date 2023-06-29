import { Box, Spinner } from "@chakra-ui/react";

const Loading: React.FC<{ pt?: number | string; height?: number }> = ({
  pt,
  height,
}) => {
  return (
    <Box
      display="flex"
      w="100%"
      justifyContent="center"
      pt={pt || 250}
      height={height}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#5AE691"
        size="xl"
      />
    </Box>
  );
};

export default Loading;
