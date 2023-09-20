import { useNavigate } from "react-router-dom";
import styles from "./HotelItem.module.css";
import PopupModal from "../Modal/PopupModal";
import { useState } from "react";
const HotelItem = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteBtn, setshowDeleteBtn] = useState(true);
  const [message, setMessage] = useState(
    "Please confirm to delete this Hotel!"
  );
  const navigate = useNavigate();
  const editHotelHandler = () => {
    navigate(`/hotel/formhotel?mode=update&id=${props.hotel._id}`);
  };
  const postDeleteHotel = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/hotel/deletehotel`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotelId: props.hotel._id }),
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
    //Nếu như sau khi xóa xong(không hiện nút delete nửa) mà bấm close thì sẽ render lại list để lấy list hotel sau khi xóa
    if (!showDeleteBtn) {
      props.getListHotel();
    }
    setMessage("Please confirm to delete this Hotel!");
    setshowDeleteBtn(true);
    setShowPopup(false);
  };
  const deleteHotelHandler = () => {
    postDeleteHotel();
  };

  return (
    <>
      <tr>
        <td>
          <input type="checkbox"></input>
        </td>
        <td className={styles.idColumn}>{props.hotel._id}</td>
        <td className={styles.nameColumn}>{props.hotel.name}</td>
        <td className={styles.typeColumn}>{props.hotel.type}</td>
        <td className={styles.titleColumn}>{props.hotel.title}</td>
        <td>{props.hotel.city}</td>
        <td>
          <button onClick={editHotelHandler} className={styles.editBtn}>
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
export default HotelItem;
