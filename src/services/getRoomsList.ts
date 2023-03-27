import request from "near-social-bridge/request";

interface GetRoomsListResponse {
  roomsList: string[];
}

const getRoomsList = () => {
  return request<GetRoomsListResponse>(
    "get-rooms-list",
    {},
    {
      forceTryAgain: true,
    }
  );
};
export default getRoomsList;
