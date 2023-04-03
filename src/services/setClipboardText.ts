import { request } from "near-social-bridge/request";

interface SetClipboardTextPayload {
  text: string;
}

const setClipboardText = (payload: SetClipboardTextPayload) => {
  return request("set-clipboard-text", payload, {
    forceTryAgain: true,
  });
};
export default setClipboardText;
