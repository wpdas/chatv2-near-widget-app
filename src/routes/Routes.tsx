import { createStackNavigator } from "near-social-bridge/navigation";
import { useAuth } from "near-social-bridge/auth";
import { NavigationProps } from "./NavigationProps";

import Home from "../screens/Home";
import CreateRoom from "../screens/CreateRoom";
import Room from "../screens/Room";
import LoggedOut from "../screens/LoggedOut";

import Loading from "../components/Loading";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  const auth = useAuth();

  return (
    <>
      <Navigator>
        {auth.user && auth.ready ? (
          <>
            <Screen name="Home" component={Home} iframeHeight={500} />
            <Screen
              name="CreateRoom"
              component={CreateRoom}
              iframeHeight={500}
            />
            <Screen name="Room" component={Room} iframeHeight={740} />
          </>
        ) : (
          <Screen name="LoggedOut" component={LoggedOut} iframeHeight={600} />
        )}
      </Navigator>
    </>
  );
};

export default Routes;
