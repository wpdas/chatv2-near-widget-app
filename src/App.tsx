import { ChakraProvider } from "@chakra-ui/react";
import Routes from "./routes/Routes";

const App = () => {
  return (
    <ChakraProvider>
      <Routes />
    </ChakraProvider>
  );
};

export default App;
