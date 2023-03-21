import { IFrameStackScreenProps } from "near-social-bridge/navigation";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  CreateRoom: {
    roomId: string;
  };
  Room: {
    ipfsCidAvatar?: string;
    userName?: string;
  };
};

// Screen props
export type PreHomeScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "Home"
>;

export type CreateRoomScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "CreateRoom"
>;

export type RoomScreenProps = IFrameStackScreenProps<NavigationProps, "Room">;
