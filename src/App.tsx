import { ChakraProvider } from "@chakra-ui/react";
import { NearSocialBridgeProvider } from "near-social-bridge";
import RoomsProvider from "./contexts/RoomsProvider";
import Routes from "./routes/Routes";

import Loading from "./components/Loading";

const App = () => {
  return (
    <ChakraProvider>
      <NearSocialBridgeProvider fallback={<Loading />}>
        <RoomsProvider>
          <Routes />
        </RoomsProvider>
      </NearSocialBridgeProvider>
    </ChakraProvider>
  );
};

export default App;
