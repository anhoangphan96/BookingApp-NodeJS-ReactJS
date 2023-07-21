import { useNavigate } from "react-router-dom";
import Card from "../Components/CardContainer/Card";
import styles from "./AddHotel.module.css";
import { useState } from "react";
const AddHotel = () => {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [distanceInput, setDistanceInput] = useState();
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState();
  const [pictureInput, setPictureInput] = useState("");
  const [featuredInput, setFeaturedInput] = useState("");
  const [roomInput, setRoomInput] = useState("");

  const nameChangeHandler = (event) => {
    setNameInput(event.target.value);
  };
  const typeChangeHandler = (event) => {
    setTypeInput(event.target.value);
  };
  const cityChangeHandler = (event) => {
    setCityInput(event.target.value);
  };
  const addressChangeHandler = (event) => {
    setAddressInput(event.target.value);
  };
  const distanceChangeHandler = (event) => {
    setDistanceInput(event.target.value);
  };
  const titleChangeHandler = (event) => {
    setTitleInput(event.target.value);
  };
  const descChangeHandler = (event) => {
    setDescInput(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPriceInput(event.target.value);
  };
  const pictureChangeHandler = (event) => {
    setPictureInput(event.target.value);
  };
  const featuredChangeHandler = (event) => {
    setFeaturedInput(event.target.value);
  };
  const roomChangeHandler = (event) => {
    setRoomInput(event.target.value);
  };

  const sendDataAddHotel = async () => {
    const response = await fetch(`http://localhost:5000/hotel/addhotel`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: nameInput,
        type: typeInput.toLowerCase(),
        city: cityInput,
        address: addressInput,
        distance: distanceInput,
        title: titleInput,
        desc: descInput,
        price: priceInput,
        picture: pictureInput.split("\n"),
        featured: featuredInput === "true", // set giá trị input từ user thành boolean
        room: roomInput.split("\n"),
      }),
    });
    if (response.ok) {
      navigate("/hotel");
    }
  };
  const submitSendAddHotel = (event) => {
    event.preventDefault();
    sendDataAddHotel();
  };

  return (
    <>
      <Card className={styles.cardContainer}>
        <h3>Add New Product</h3>
      </Card>
      <Card className={`${styles.cardContainer} ${styles.cardFormHotel}`}>
        <form className={styles.formHotel} onSubmit={submitSendAddHotel}>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="My Hotel"
              onChange={nameChangeHandler}
              value={nameInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="type">Type</label>
            <input
              id="type"
              type="text"
              placeholder="hotel"
              onChange={typeChangeHandler}
              value={typeInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="city"
              placeholder="New York"
              onChange={cityChangeHandler}
              value={cityInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="address">Adress</label>
            <input
              id="address"
              type="text"
              placeholder="elton st, 216"
              onChange={addressChangeHandler}
              value={addressInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="distance">Distance from City Center(m)</label>
            <input
              id="distance"
              type="text"
              placeholder="500"
              onChange={distanceChangeHandler}
              value={distanceInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              placeholder="The best Hotel"
              onChange={titleChangeHandler}
              value={titleInput}
            ></input>
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              placeholder="Description"
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
            <label htmlFor="image">Image</label>
            <textarea
              id="image"
              type="text"
              onChange={pictureChangeHandler}
              value={pictureInput}
            ></textarea>
          </div>
          <div className={`${styles.inputfield} ${styles.featuredField}`}>
            <label htmlFor="featured">Featured</label>
            <select
              id="featured"
              onChange={featuredChangeHandler}
              value={featuredInput}
            >
              <option value="No">No</option>
            </select>
          </div>
          <div className={`${styles.inputfield} ${styles.roomFiled}`}>
            <label htmlFor="room">Rooms</label>
            <textarea
              id="room"
              type="text"
              onChange={roomChangeHandler}
              value={roomInput}
            ></textarea>
          </div>
          <button className={styles.btnSend}>Send</button>
        </form>
      </Card>
    </>
  );
};
export default AddHotel;
