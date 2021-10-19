import { Dispatch, SetStateAction } from "react";
import UserInfo from "../../models/userInfo";
import "./UserDetailsModal.css";

interface UserDetailsModalProps {
  details: UserInfo;
  setShowDetailsModal: Dispatch<SetStateAction<boolean>>;
}
function UserDetailsModal(props: UserDetailsModalProps): JSX.Element {
  return (
    <div className="UserDetailsModal">
      <div className="user-details-modal-center">
        <h4>User Information</h4>
        <div>ID : {props.details.id}</div>
        {props.details.name !== "" && <div>NAME : {props.details.name}</div>}
        {props.details.firstName !== "" && (
          <>
            <div>FIRST NAME : {props.details.firstName}</div>
            <div>LAST NAME :{props.details.lastName}</div>
          </>
        )}
        <div>EMAIL : {props.details.email}</div>
        <div>PASSWORD : {props.details.password}</div>
        <button
          className="close-btn"
          onClick={() => {
            props.setShowDetailsModal(false);
          }}
        ></button>
      </div>
    </div>
  );
}

export default UserDetailsModal;
