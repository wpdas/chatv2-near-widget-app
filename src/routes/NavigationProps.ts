import { IFrameStackScreenProps } from "near-social-bridge/navigation";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  Profile: {
    ipfsCidAvatar?: string;
    userName?: string;
  };
};

// Screen props
export type PreHomeScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Home"
>;

export type ProfileScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Profile"
>;
