import { IFrameStackScreenProps } from "near-social-bridge/navigation";
import { RoomMessage } from "../services/getRoomData";

// Navigation props
export type NavigationProps = {
  Home: undefined;
  CreateRoom: {
    roomId: string;
  };
  Room: {
    roomId: string;
    roomMessages: RoomMessage[];
  };
  LoggedOut: undefined;
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

export type LoggedOutScreenProps = IFrameStackScreenProps<
  NavigationProps,
  "LoggedOut"
>;
