import { Box } from "@chakra-ui/react";

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      w="100%"
      minH="740px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {children}
    </Box>
  );
};

export default Container;
