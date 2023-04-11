const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 15px;
  padding-top: 0;
  border: 1px solid #888;
  width: 80%;
  max-width: 435px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  align-self: end;
  cursor: pointer;
`;

const onCopyHandler = () => {
  setTimeout(() => {
    if (props.onCopy) {
      props.onCopy(props.text);
    }
  }, 1000);
};

return (
  <Modal>
    <ModalContent>
      <CloseButton
        onClick={() => {
          if (props.onCopy) {
            props.onCopy(props.text);
          }
        }}
      >
        &times;
      </CloseButton>
      <p class="h6">{props.description || "Description"}</p>

      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>{state.copied ? "Copied!" : "Copy to clipboard"}</Tooltip>
        }
      >
        <button
          className={props.className ?? "btn btn-outline-success border-0"}
          onClick={() => {
            clipboard.writeText(props.text).then(() => {
              State.update({ copied: true });
              onCopyHandler();
            });
          }}
        >
          {state.copied ? (
            <>
              {props.copiedIcon ?? <i className="bi bi-check-lg success" />}{" "}
              {props.copiedLabel ?? props.label}
            </>
          ) : (
            <>
              {props.clipboardIcon ?? <i className="bi bi-clipboard" />}{" "}
              {props.label}
            </>
          )}
        </button>
      </OverlayTrigger>
    </ModalContent>
  </Modal>
);
