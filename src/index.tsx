import ReactDOM from "react-dom/client";
import { NearSocialBridgeProvider } from "near-social-bridge";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <NearSocialBridgeProvider>
    <App />
  </NearSocialBridgeProvider>
);
