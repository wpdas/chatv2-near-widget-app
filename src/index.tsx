import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "near-social-bridge/near-social-bridge.css";
import { initRefreshService } from "near-social-bridge";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<App />);

if (process.env.REACT_APP_ENV !== "production") {
  initRefreshService();
}
