import request from "near-social-bridge/request";

export interface GetUserResponse {
  accountId: string;
  profileInfo: {
    name: string;
    image: {
      ipfs_cid: string;
    };
    linktree?: {
      github?: string;
      twitter?: string;
    };
  };
}

// Send a request to Near Social View to get basic user info
const getUserInfo = () => request<GetUserResponse>("get-user-info");
export default getUserInfo;
