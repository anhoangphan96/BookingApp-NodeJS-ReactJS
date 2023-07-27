import React, { useState } from "react";
import styles from "./SearchPopup.module.css";
import DateRageInput from "../Header/DateRangeInput";
import { useSelector } from "react-redux";
const SearchPopup = function () {
  const searchData = useSelector((state) => state.search);
  console.log(searchData);
  const [destination, setDestination] = useState(searchData.destination);
  const [date, setDate] = useState(searchData.date);
  const [adult, setAdult] = useState(searchData.adult);
  const [children, setChildren] = useState(searchData.children);
  const [room, setRoom] = useState(searchData.room);
  const destinationChangeHandler = (event) => {
    setDestination(event.target.value);
  };
  const dateChangeHandler = (event) => {
    setDate(event.target.value);
  };
  const adultChangeHandler = (event) => {
    setAdult(event.target.value);
  };
  const childrenChangeHandler = (event) => {
    setChildren(event.target.value);
  };
  const roomChangeHandler = (event) => {
    setRoom(event.target.value);
  };
  //Render ra Search PopUp có tái sử dụng lại thẻ Daterange input
  return (
    <div className={styles.searchPopup}>
      <h2>Search</h2>
      <form>
        <label htmlFor="destination">Destination</label>
        <input
          type="text"
          id="destination"
          value={destination}
          onChange={destinationChangeHandler}
        />
        <label htmlFor="date">Check-in Date</label>
        <input
          type="text"
          id="date"
          value={date}
          onChange={dateChangeHandler}
        />
        <div>Options</div>
        <div className={styles.options}>
          <div>
            <label htmlFor="minprice">
              Min price <span>per night</span>
            </label>
            <input type="number" size="4" id="minprice"></input>
          </div>
          <div>
            <label htmlFor="maxprice">
              Max price <span>per night</span>
            </label>
            <input type="number" id="maxprice"></input>
          </div>
          <div>
            <label htmlFor="adult">Adult</label>
            <input
              type="number"
              size="4"
              placeholder="1"
              id="adult"
              value={adult}
              onChange={adultChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="children">Children</label>
            <input
              type="number"
              size="4"
              placeholder="0"
              value={children}
              onChange={childrenChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="room">Room</label>
            <input
              type="number"
              size="4"
              placeholder="1"
              id="room"
              value={room}
              onChange={roomChangeHandler}
            ></input>
          </div>
        </div>
        {/* <button className={styles.search}>Search</button> */}
      </form>
    </div>
  );
};
export default SearchPopup;
