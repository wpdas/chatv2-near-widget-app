import { createStackNavigator } from "near-social-bridge/navigation";
import { NavigationProps } from "./NavigationProps";

import Home from "../screens/Home";
import Profile from "../screens/Profile";

// Optional Fallback Loading component to show while the connection is being established
const FallbackLoadingComponent = () => <p>Loading...</p>;

const { Navigator, Screen } = createStackNavigator<NavigationProps>(
  <FallbackLoadingComponent />
);

const Routes: React.FC = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} iframeHeight={520} />
      <Screen name="Profile" component={Profile} iframeHeight={420} />
    </Navigator>
  );
};

export default Routes;
