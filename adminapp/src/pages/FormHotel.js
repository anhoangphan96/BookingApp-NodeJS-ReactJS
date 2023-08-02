import {
  useNavigate,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import Card from "../Components/CardContainer/Card";
import styles from "./FormHotel.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/reduxstore";
const FormHotel = () => {
  const listRoom = useRouteLoaderData("mainroot");
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const hotelid = searchParams.get("id");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [typeInput, setTypeInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [addressInput, setAddressInput] = useState("");
  const [distanceInput, setDistanceInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [pictureInput, setPictureInput] = useState("");
  const [featuredInput, setFeaturedInput] = useState(false);
  const [roomInput, setRoomInput] = useState("");
  const [errorInput, setErrorInput] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    picture: "",
    room: "",
  });

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

  const getHotelUpdateOne = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/hotel/updatehotel?id=${hotelid}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        dispatch(loginActions.LOGOUT());
        navigate("/login");
      }
      const data = await response.json();
      console.log(data);
      setNameInput(data.name);
      setTypeInput(data.type);
      setCityInput(data.city);
      setAddressInput(data.address);
      setDistanceInput(data.distance);
      setTitleInput(data.title);
      setDescInput(data.desc);
      setPriceInput(data.cheapestPrice);
      setPictureInput(data.photos.join("\n"));
      setFeaturedInput(data.featured);
      setRoomInput(data.rooms.map((room) => room.title).join("\n"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (mode === "update") {
      getHotelUpdateOne();
    }
  }, []);

  const sendDataInputHotel = async () => {
    let urlToFetch;
    if (mode === "add") {
      urlToFetch = `http://localhost:5000/hotel/addhotel`;
    } else if (mode === "update") {
      urlToFetch = `http://localhost:5000/hotel/updatehotel?id=${hotelid}`;
    }
    const response = await fetch(urlToFetch, {
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
        price: Number(priceInput),
        picture: pictureInput.split("\n").filter((picture) => picture !== ""),
        featured: featuredInput === "true", // set giá trị input từ user thành boolean
        room: roomInput.split("\n").filter((picture) => picture !== ""),
      }),
    });
    if (response.ok) {
      setErrorInput({
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        title: "",
        desc: "",
        picture: "",
        room: "",
      });
      navigate("/hotel");
    } else if (response.status === 400) {
      const errorInput = await response.json();
      setErrorInput(errorInput);
    }
  };
  const calculateCheapestPrice = (e) => {
    const listArrRoomName = roomInput.split("\n");
    let listPrice = [];
    listArrRoomName.forEach((rname) => {
      const roomFind = listRoom.find((room) => {
        return room.title === rname;
      });
      roomFind && listPrice.push(roomFind.price);
    });
    const minPrice = listPrice.length === 0 ? 0 : Math.min(...listPrice);
    setPriceInput(minPrice);
  };

  const submitSendAddHotel = (event) => {
    event.preventDefault();
    sendDataInputHotel();
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
            {errorInput.name && <p>{errorInput.name}</p>}
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
            {errorInput.type && <p>{errorInput.type}</p>}
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
            {errorInput.city && <p>{errorInput.city}</p>}
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
            {errorInput.address && <p>{errorInput.address}</p>}
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
            {errorInput.distance && <p>{errorInput.distance}</p>}
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
            {errorInput.title && <p>{errorInput.title}</p>}
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
            {errorInput.desc && <p>{errorInput.desc}</p>}
          </div>
          <div className={`${styles.inputfield}`}>
            <label htmlFor="price">
              Cheapest Price (automatically updated by list rooms)
            </label>
            <input
              disabled
              id="price"
              type="number"
              placeholder="0"
              onChange={priceChangeHandler}
              value={priceInput}
            ></input>
          </div>
          <div className={`${styles.inputfield} ${styles.pictureField}`}>
            <label htmlFor="image">Image</label>
            <textarea
              id="image"
              type="text"
              onChange={pictureChangeHandler}
              value={pictureInput}
              placeholder="Seperate url image by Enter"
            ></textarea>
            {errorInput.picture && <p>{errorInput.picture}</p>}
          </div>
          <div className={`${styles.inputfield} ${styles.featuredField}`}>
            <label htmlFor="featured">Featured</label>
            <select
              id="featured"
              onChange={featuredChangeHandler}
              value={featuredInput}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <div className={`${styles.inputfield} ${styles.roomFiled}`}>
            <label htmlFor="room">Rooms</label>
            <textarea
              id="room"
              type="text"
              onChange={roomChangeHandler}
              value={roomInput}
              onBlur={calculateCheapestPrice}
              placeholder="Seperate room type by Enter"
            ></textarea>
            {errorInput.room && <p>{errorInput.room}</p>}
          </div>
          <button className={styles.btnSend}>Send</button>
        </form>
      </Card>
    </>
  );
};
export default FormHotel;
