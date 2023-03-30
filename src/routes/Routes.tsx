import { createStackNavigator, useAuth } from "near-social-bridge";
import { NavigationProps } from "./NavigationProps";

import Home from "../screens/Home";
import MobileChatRoom from "../screens/MobileChatRoom";
import LoggedOut from "../screens/LoggedOut";

import Loading from "../components/Loading";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  const auth = useAuth();

  if (!auth.ready) return <Loading />;

  return (
    <>
      {auth.user ? (
        <Navigator>
          <Screen name="Home" component={Home} iframeHeight={740} />
          <Screen
            name="MobileChatRoom"
            component={MobileChatRoom}
            iframeHeight={740}
          />
        </Navigator>
      ) : (
        <Navigator>
          <Screen name="LoggedOut" component={LoggedOut} iframeHeight={740} />
        </Navigator>
      )}
    </>
  );
};

export default Routes;
