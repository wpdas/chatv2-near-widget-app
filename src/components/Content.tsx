import { Box, ResponsiveValue } from "@chakra-ui/react";
import * as CSS from "csstype";

type Props = {
  children: React.ReactNode;
  direction?: ResponsiveValue<CSS.Property.FlexDirection>;
};

const Content: React.FC<Props> = ({ children, direction }) => {
  return (
    <Box w="100%" display="flex" flexDirection={direction || "column"}>
      {children}
    </Box>
  );
};

export default Content;
