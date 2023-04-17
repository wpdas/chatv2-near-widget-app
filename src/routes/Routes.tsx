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
        <Navigator autoHeightSync>
          <Screen name="Home" component={Home} />
          <Screen name="MobileChatRoom" component={MobileChatRoom} />
        </Navigator>
      ) : (
        <Navigator autoHeightSync>
          <Screen name="LoggedOut" component={LoggedOut} />
        </Navigator>
      )}
    </>
  );
};

export default Routes;
