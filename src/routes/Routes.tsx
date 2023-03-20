import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

const { Navigator, Screen } = createStackNavigator<NavigationProps>();

const Routes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} iframeHeight={420} />
      <Screen name="Profile" component={Profile} />
    </Navigator>
  );
};

export default Routes;
