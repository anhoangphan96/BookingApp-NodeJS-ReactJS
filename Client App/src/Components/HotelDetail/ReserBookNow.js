import styles from "./ReserBookNow.module.css";
import { useState } from "react";
import { DateRange } from "react-date-range";
import { format, addDays } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import RoomItem from "./RoomItem";
import { useSelector } from "react-redux";
const ReserBookNow = () => {
  const navigate = useNavigate();
  const totalPrice = useSelector((state) => state.roomList.totalPrice);
  const roomsSelected = useSelector((state) => state.roomList.roomsSelected);
  const [listRoom, setListRoom] = useState([]);
  const params = useParams();
  const [dateFormatted, setDateFormatted] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  const idHotel = params.id;
  const getRoomsAvailable = async (dateRange) => {
    const response = await fetch(
      `http://localhost:5000/detail/${idHotel}/rooms/available?dateRange=${dateRange}`
    );
    const data = await response.json();
    setListRoom(data);
  };

  const dateRangeHandler = function (ranges) {
    setRanges([ranges.selection]);
    if (ranges.selection.endDate >= ranges.selection.startDate) {
      const dateRange = `${format(
        ranges.selection.startDate,
        "dd/MM/yyyy"
      )} - ${format(ranges.selection.endDate, "dd/MM/yyyy")}`;
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
        totalPrice: totalPrice,
        date: dateFormatted,
        payMethod: paymentMethod,
      }),
    });
    if (response.ok) {
      navigate("/transaction");
    }
  };

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
        <div className={styles.infor}>
          <h3>Reserve Info</h3>
          <label htmlFor="fullName">Your Full Name:</label>
          <input id="fullName" placeholder="Full Name"></input>
          <label htmlFor="email">Your Email:</label>
          <input id="email" placeholder="Email"></input>
          <label htmlFor="phone">Your Phone Number:</label>
          <input id="phone" placeholder="Phone Number"></input>
          <label htmlFor="cardnumber">Your Your Identity Card Number:</label>
          <input id="cardnumber" placeholder="Card Number"></input>
        </div>
      </div>
      <div className={styles.selectRooms}>
        <h3>Select Rooms</h3>
        <ul className={styles.listRoom}>
          {listRoom.map((room) => (
            <li className={styles.inforContainer}>
              <RoomItem room={room} />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.total}>
        <h3>Total Bill: ${totalPrice}</h3>
        <div>
          <select onChange={paymentMethodHandler} value={paymentMethod}>
            <option value="">Select Payment Method</option>
            <option value="credit">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
          <button>Reserve Now</button>
        </div>
      </div>
    </form>
  );
};
export default ReserBookNow;
