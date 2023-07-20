import { useDispatch } from "react-redux";
import styles from "./RoomItem.module.css";
import { roomListActions } from "../../store/store";
const RoomItem = (props) => {
  const dispatch = useDispatch();
  const chooseRomHandler = (event) => {
    if (event.target.checked) {
      dispatch(
        roomListActions.addRoom({
          price: props.room.price,
          room: event.target.value,
        })
      );
    } else {
      dispatch(
        roomListActions.removeRoom({
          price: props.room.price,
          room: event.target.value,
        })
      );
    }
  };
  return (
    <>
      <div>
        <h4>{props.room.title}</h4>
        <p>{props.room.desc}</p>
        <h5>Max people: {props.room.maxPeople}</h5>
        <h4>{props.room.price}</h4>
      </div>
      <ul className={styles.listRoomNumber}>
        {props.room.roomNumbers.map((rnum) => (
          <li className={styles.roomNumber}>
            <label htmlFor={rnum}>{rnum}</label>
            <input
              type="checkbox"
              id={rnum}
              value={rnum}
              name="roomnumber"
              onChange={chooseRomHandler}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default RoomItem;
