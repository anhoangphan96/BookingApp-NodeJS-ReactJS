import styles from "./ReserBookNow.module.css";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import RoomItem from "./RoomItem";
import { useSelector } from "react-redux";
import ReserveInfor from "./ReserveInfor";
const ReserBookNow = () => {
  const navigate = useNavigate();
  const totalPriceOneDay = useSelector((state) => state.roomList.totalPrice);
  const roomsSelected = useSelector((state) => state.roomList.roomsSelected);
  const [listRoom, setListRoom] = useState([]);
  const params = useParams();
  const [dateFormatted, setDateFormatted] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dayBook, setDayBook] = useState(0);
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const idHotel = params.id;
  const getRoomsAvailable = async (dateRange) => {
    const response = await fetch(
      `http://localhost:5000/room/available?dateRange=${dateRange}&id=${idHotel}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    const data = await response.json();
    setListRoom(data);
  };
  //Khi mới bấm để display giao diện reserve thì stadate và endate sẽ trùng nhau sau đó cũng gọi fetch để lấy roomlit
  useEffect(() => {
    const dateRange = `${format(ranges[0].startDate, "dd/MM/yyyy")} - ${format(
      ranges[0].endDate,
      "dd/MM/yyyy"
    )}`;
    setDayBook(
      Math.floor(
        (ranges[0].endDate - ranges[0].startDate) / (60 * 60 * 24 * 1000)
      ) + 1
    );
    getRoomsAvailable(dateRange);
    setDateFormatted(dateRange);
  }, []);

  const dateRangeHandler = function (ranges) {
    setRanges([ranges.selection]);
    if (ranges.selection.endDate >= ranges.selection.startDate) {
      const dateRange = `${format(
        ranges.selection.startDate,
        "dd/MM/yyyy"
      )} - ${format(ranges.selection.endDate, "dd/MM/yyyy")}`;
      setDayBook(
        Math.floor(
          (ranges.selection.endDate - ranges.selection.startDate) /
            (60 * 60 * 24 * 1000)
        ) + 1
      );
      getRoomsAvailable(dateRange);
      setDateFormatted(dateRange);
    }
  };

  const paymentMethodHandler = (event) => {
    setPaymentMethod(event.target.value);
  };

  const reserveNowHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/transaction/reserve`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: idHotel,
        roomList: roomsSelected,
        totalPrice: totalPriceOneDay * dayBook,
        date: dateFormatted,
        payMethod: paymentMethod,
      }),
    });
    if (response.ok) {
      navigate("/transaction");
    }
  };
  console.log(listRoom);
  return (
    <form className={styles.formBook} onSubmit={reserveNowHandler}>
      <div className={styles.dateandinfor}>
        <div className={styles.dateRange}>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            onChange={dateRangeHandler}
            ranges={ranges}
          />
        </div>
        <ReserveInfor></ReserveInfor>
      </div>
      <div className={styles.selectRooms}>
        <h3>Select Rooms</h3>
        <ul className={styles.listRoom}>
          {listRoom.map((room) => (
            <RoomItem
              room={room}
              dayBook={dayBook}
              key={room._id + dateFormatted}
            />
          ))}
        </ul>
      </div>
      <div className={styles.total}>
        <h3>Total Bill: ${totalPriceOneDay * dayBook}</h3>
        <div className={styles.methodAndBook}>
          <select onChange={paymentMethodHandler} value={paymentMethod}>
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          <button className={styles.reserveBtn}>Reserve Now</button>
        </div>
      </div>
    </form>
  );
};
export default ReserBookNow;
