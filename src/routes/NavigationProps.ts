import { IFrameStackScreenProps } from "near-social-bridge/navigation";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  MobileChatRoom: {
    roomId: string;
  };
  LoggedOut: undefined;
};

// Screen props
export type PreHomeScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Home"
>;

export type MobileChatRoomScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "MobileChatRoom"
>;

export type LoggedOutScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "LoggedOut"
>;
