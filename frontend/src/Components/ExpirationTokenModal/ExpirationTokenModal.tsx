import { Dispatch, SetStateAction } from "react";
import "./ExpirationTokenModal.css";

interface ExpirationTokenModalProps {
  setExpirationTokenModal: Dispatch<SetStateAction<boolean>>;
}
function ExpirationTokenModal(props: ExpirationTokenModalProps): JSX.Element {
  return (
    <div className="ExpirationTokenModal">
      <div className="expiration-token-modal-center">
        <button
          className="close-btn"
          onClick={() => props.setExpirationTokenModal(false)}
        ></button>
        <div>
          Your session time has come to an end,
          <br />
          please login again
        </div>
      </div>
    </div>
  );
}

export default ExpirationTokenModal;
