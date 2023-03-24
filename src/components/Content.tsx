import { Box } from "@chakra-ui/react";

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      w="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={4}
    >
      {children}
    </Box>
  );
};

export default Content;
