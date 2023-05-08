/**
 * This Widget was built using NEAR Social Bridge library.
 * Visit https://github.com/wpdas/near-social-bridge to get to know more.
 */

/**
 * App index key to store things (only rooms as this app is re fetching messages from ChatV1)
 * It should use a non "-dev" key for V3. This is being used because rooms were already created
 */
const APP_INDEX_KEY = "widget-chatv2-dev";

/**
 * App setup
 */
// const externalAppUrl = "https://near-test-app.web.app/";
const externalAppUrl = "http://localhost:3000";

const path = props.path;
const initialViewHeight = 740;
const initialPayload = {
  // mainChatURL: "https://alpha.near.org/wendersonpires.near/widget/ChatV2",
  mainChatURL: "http://localhost:3001/#/view/ChatV2",
  room: props.room, // starts with this room
};

State.init({
  showShareModal: false,
  clipboardText: "",
});

/**
 * Request Handlers.
 */
const requestHandler = (request, response, Utils) => {
  switch (request.type) {
    case "get-room-data":
      getRoomDataHandler(request, response, Utils);
      break;
    case "send-message":
      sendMessageHandler(request, response);
      break;
    case "register-new-room":
      registerNewRoomHandler(request, response, Utils);
      break;
    case "get-rooms-list":
      getRoomsListHandler(request, response, Utils);
      break;
    case "set-clipboard-text":
      setClipboardTextHandler(request, response);
      break;
  }
};

const getRoomDataHandler = (request, response, Utils) => {
  const { payload } = request;

  if (!payload.roomId) {
    response(request).send({ error: "roomId prop must be provided" });
    return;
  }

  Utils.promisify(
    () =>
      Social.index(payload.roomId, "data", {
        subscribe: true,
        limit: 100,
        order: "desc",
      }),
    (roomData) => {
      const roomExists = roomData && roomData.length > 0;
      if (!roomExists) {
        response(request).send({ error: "room not found" });
        return;
      }
      response(request).send({ messages: roomData });
    },
    (err) => {
      response(request).send({ error: "internal error" });
    }
  );
};

const sendMessageHandler = (request, response) => {
  const { payload } = request;
  if (payload.roomId && payload.message) {
    // Store message.
    Social.set(
      {
        index: {
          [payload.roomId]: JSON.stringify(
            {
              key: "data",
              value: payload.message,
            },
            undefined,
            0
          ),
        },
      },
      {
        force: true,
        onCommit: () => {
          response(request).send({});
        },
        onCancel: () => {
          response(request).send({ error: "the action was canceled" });
        },
      }
    );
    return;
  }

  // Error
  response(request).send({
    error: "you must provide the roomId and a message prop",
  });
};

const registerNewRoomHandler = (request, response, Utils) => {
  const { roomId } = request.payload;
  if (!roomId) {
    response(request).send({ error: "you must provide the roomId prop" });
    return;
  }

  Utils.promisify(
    () => fetchRooms(),
    (rooms) => {
      if (rooms.includes(roomId)) {
        response(request).send({ roomsList: rooms });
        return;
      }

      // Update the rooms list
      const updatedRoomsList = [...rooms, roomId];
      // Register it on chain
      Social.set(
        {
          index: {
            [APP_INDEX_KEY]: JSON.stringify(
              {
                key: "room",
                value: roomId,
              },
              undefined,
              0
            ),
          },
        },
        {
          force: true,
          onCommit: () => {
            response(request).send({ roomsList: updatedRoomsList });
          },
          onCancel: () => {
            response(request).send({ error: "the action was canceled" });
          },
        }
      );
    },
    () => {
      response(request).send({ error: "unknown error" });
    }
  );
};

const getRoomsListHandler = (request, response, Utils) => {
  Utils.promisify(
    () => fetchRooms(),
    (rooms) => {
      // Send the rooms list
      response(request).send({ roomsList: rooms });
    },
    () => {
      response(request).send({ error: "rooms list is not set", roomsList: [] });
    }
  );
};

const setClipboardTextHandler = (request, response) => {
  if (request.payload.text) {
    State.update({ clipboardText: request.payload.text, showShareModal: true });
  }
  response(request).send({});
};

// Helpers
const fetchRooms = () => {
  const data = Social.index(APP_INDEX_KEY, "room", {
    subscribe: true,
    limit: 1000,
    order: "desc",
  });

  if (!data) return null;

  const sorted = data.sort((m1, m2) => m1.blockHeight - m2.blockHeight);
  return sorted.map((roomData) => roomData.value); // ["room-name"]
};
// Helpers END

/**
 * Close the Share Chat Room modal after clicking on copy
 */
const onCopy = () => {
  State.update({ clipboardText: "", showShareModal: false });
};

return (
  <div>
    <Widget
      src="wendersonpires.near/widget/NearSocialBridgeCore"
      props={{
        externalAppUrl,
        path,
        initialViewHeight,
        initialPayload,
        requestHandler,
      }}
    />
    {state.showShareModal && (
      <Widget
        src="wendersonpires.near/widget/NSLVWidget"
        props={{
          src: "wendersonpires.near/widget/CopyToClipboardModal",
          srcProps: {
            description: "Click on the button below to copy the Chat Room Link",
            text: state.clipboardText,
            onCopy,
          },
        }}
      />
    )}
  </div>
);
