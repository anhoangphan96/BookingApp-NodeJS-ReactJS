import { useNavigate, useSearchParams } from "react-router-dom";
import Card from "../Components/CardContainer/Card";
import styles from "./FormRoom.module.css";
import { useEffect, useState } from "react";
const FormRoom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const idRoom = searchParams.get("id");

  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [maxpeopleInput, setMaxpeopleInput] = useState("");
  const [roomInput, setRoomInput] = useState("");
  const [hotelInput, setHotelInput] = useState("");
  const [listHotel, setListHotel] = useState([]);
  const titleChangeHandler = (event) => {
    setTitleInput(event.target.value);
  };
  const descChangeHandler = (event) => {
    setDescInput(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPriceInput(event.target.value);
  };
  const maxpeopleChangeHandler = (event) => {
    setMaxpeopleInput(event.target.value);
  };
  const roomChangeHandler = (event) => {
    setRoomInput(event.target.value);
  };
  const hotelChangeHandler = (event) => {
    setHotelInput(event.target.value);
  };
  const getDataOneRoom = async () => {
    const response = await fetch(
      `http://localhost:5000/room/updateroom?id=${idRoom}`
    );
    const data = await response.json();
    console.log(data);
    setTitleInput(data.title);
    setDescInput(data.desc);
    setPriceInput(data.price);
    setMaxpeopleInput(data.maxPeople);
    setRoomInput(data.roomNumbers.join(","));
  };
  useEffect(() => {
    if (mode === "update") {
      getDataOneRoom();
    }
  }, []);
  let urlToFetch;
  if (mode === "add") {
    urlToFetch = `http://localhost:5000/room/addroom`;
  } else if (mode === "update") {
    urlToFetch = `http://localhost:5000/room/updateroom?id=${idRoom}`;
  }

  const sendDataInputRoom = async () => {
    const response = await fetch(urlToFetch, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: titleInput,
        desc: descInput,
        price: Number(priceInput),
        maxPeople: Number(maxpeopleInput),
        room: roomInput.split(",").map((room) => Number(room)), // nhận và chuyển đổi các room thành array number of room
        hotel: hotelInput, //Mặc dù để tên hotel nhưng truyền value hotelId vào backend
      }),
    });
    if (response.ok) {
      navigate("/room");
    }
  };
  const getListHotel = async () => {
    const response = await fetch(`http://localhost:5000/hotel`);
    const data = await response.json();
    setListHotel(data);
  };
  const submitSendAddRoom = (event) => {
    event.preventDefault();
    sendDataInputRoom();
  };
  useEffect(() => {
    getListHotel();
  }, []);
  return (
    <>
      <Card className={styles.cardContainer}>
        <h3>Add New Room</h3>
      </Card>
      <Card className={`${styles.cardContainer} ${styles.cardFormRoom}`}>
        <form className={styles.formRoom} onSubmit={submitSendAddRoom}>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="2 bed room"
              onChange={titleChangeHandler}
              value={titleInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="King size bed, 1 bathroom"
              onChange={descChangeHandler}
              value={descInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              placeholder="100"
              onChange={priceChangeHandler}
              value={priceInput}
            ></input>
          </div>

          <div className={`${styles.inputfield}`}>
            <label htmlFor="maxpeople">Max People</label>
            <input
              id="maxpeople"
              type="number"
              placeholder="2"
              onChange={maxpeopleChangeHandler}
              value={maxpeopleInput}
            ></input>
          </div>
          <div className={styles.lastRow}>
            <div className={`${styles.inputfield} ${styles.roomFiled}`}>
              <label htmlFor="room">Rooms</label>
              <textarea
                id="room"
                type="text"
                onChange={roomChangeHandler}
                value={roomInput}
                placeholder="give comma between room numbers"
              ></textarea>
            </div>
            <div className={`${styles.inputfield} ${styles.hotelField}`}>
              <label htmlFor="hotel">Choose a hotel</label>
              <select
                id="hotel"
                onChange={hotelChangeHandler}
                value={hotelInput}
              >
                <option value="">Please select Hotel</option>
                {listHotel.map((hotel) => (
                  <option value={hotel._id}>{hotel.name}</option>
                ))}
              </select>
            </div>
            <button className={styles.btnSend}>Send</button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default FormRoom;
