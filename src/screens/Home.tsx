import { useEffect, useState } from "react";
import { useNavigation } from "near-social-bridge/navigation";
import { NavigationProps, PreHomeScreenProps } from "../routes/NavigationProps";
import getUserInfo, { GetUserResponse } from "../services/getUserInfo";

const Home: React.FC<PreHomeScreenProps> = () => {
  const [userInfo, setUserInfo] = useState<GetUserResponse>();

  // You can also get this from this screen props
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    // Get user info - service
    getUserInfo().then((response) => {
      setUserInfo(response);
    });
  }, []);

  const goToProfileHandler = () => {
    // Go to Profile page passing some props
    navigation.push("Profile", {
      userName: userInfo?.profileInfo.name,
      ipfsCidAvatar: userInfo?.profileInfo.image.ipfs_cid,
    });
  };

  return (
    <>
      <p>This is the Home Page</p>
      {userInfo && (
        <>
          <p>User ID: {userInfo?.accountId || "Not logged in"}</p>
          <p>User Name: {userInfo?.profileInfo?.name || "Not logged in"}</p>
        </>
      )}

      <button
        style={{ padding: 6, marginTop: 10, border: "none", borderRadius: 2 }}
        onClick={goToProfileHandler}
      >
        Go to Profile
      </button>
    </>
  );
};

export default Home;
