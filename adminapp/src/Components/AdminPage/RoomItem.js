import { useNavigate } from "react-router-dom";
import styles from "./RoomItem.module.css";
import PopupModal from "../Modal/PopupModal";
import { useState } from "react";
const RoomItem = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteBtn, setshowDeleteBtn] = useState(true);
  const [message, setMessage] = useState("Please confirm to delete this Room!");
  const navigate = useNavigate();
  const updateRoomHandler = () => {
    navigate(`/room/formroom?mode=update&id=${props.room._id}`);
  };
  const postDeleteRoom = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/room/deleteroom`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: props.room._id }),
      }
    );
    setshowDeleteBtn(false);
    const data = await response.json();
    setMessage(data.message);
  };

  //Function để show popup confirm delete
  const showPopupHandler = () => {
    setShowPopup(true);
  };
  const closeHandler = () => {
    //Nếu như sau khi xóa xong(không hiện nút delete nửa) mà bấm close thì sẽ render lại list để lấy list Room sau khi xóa
    if (!showDeleteBtn) {
      props.getListRoom();
    }
    setMessage("Please confirm to delete this Room!");
    setshowDeleteBtn(true);
    setShowPopup(false);
  };
  const deleteHotelHandler = () => {
    postDeleteRoom();
  };
  return (
    <>
      <tr>
        <td>
          <input type="checkbox"></input>
        </td>
        <td className={styles.idColumn}>{props.room._id}</td>
        <td className={styles.titleColumn}>{props.room.title}</td>
        <td className={styles.descColumn}>{props.room.desc}</td>
        <td className={styles.priceColumn}>${props.room.price}</td>
        <td className={styles.maxPeopleColumn}>{props.room.maxPeople}</td>
        <td>
          <button onClick={updateRoomHandler} className={styles.editBtn}>
            Edit
          </button>
          <button className={styles.deleteBtn} onClick={showPopupHandler}>
            Delete
          </button>
        </td>
      </tr>
      {showPopup && (
        <PopupModal message={message}>
          <div className={styles.popupbuttons}>
            <button className={styles.closeBtn} onClick={closeHandler}>
              Close
            </button>
            {showDeleteBtn && (
              <button className={styles.deleteBtn} onClick={deleteHotelHandler}>
                Delete
              </button>
            )}
          </div>
        </PopupModal>
      )}
    </>
  );
};
export default RoomItem;
