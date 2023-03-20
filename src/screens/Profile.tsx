import React from "react";
import { ProfileScreenProps } from "../routes/NavigationProps";
import "../App.css";

const Profile: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const { ipfsCidAvatar, userName } = route.params;
  const avatarImage = ipfsCidAvatar
    ? `https://i.near.social/thumbnail/https://ipfs.near.social/ipfs/${route.params.ipfsCidAvatar}`
    : "./logo192.png";

  const goToHomeHandler = () => {
    navigation.goBack();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>
        <strong>User Name:</strong> {userName || "not logged in"}
      </p>

      <img
        src={avatarImage}
        className="App-logo"
        style={{ borderRadius: "999px" }}
        alt="logo"
        width="100px"
        height="100px"
      />

      <button
        style={{ padding: 6, marginTop: 16, border: "none", borderRadius: 2 }}
        onClick={goToHomeHandler}
      >
        Go to back to Home
      </button>
    </div>
  );
};

export default Profile;
