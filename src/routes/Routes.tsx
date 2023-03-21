import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Home from "../screens/Home";
import CreateRoom from "../screens/CreateRoom";
import Room from "../screens/Room";

import Loading from "../components/Loading";

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <Loading />
);

const Routes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} iframeHeight={500} />
      <Screen name="CreateRoom" component={CreateRoom} iframeHeight={500} />
      <Screen name="Room" component={Room} iframeHeight={420} />
    </Navigator>
  );
};

export default Routes;
