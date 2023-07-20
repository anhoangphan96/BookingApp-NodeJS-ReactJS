import React, { useEffect, useState } from "react";
import styles from "./HotelDetail.module.css";
import { useParams } from "react-router-dom";
import ReserBookNow from "./ReserBookNow";
const HotelDetail = function () {
  const [hotelDetail, setHotelDetail] = useState(null);
  const [isOpenBookNow, setIsOpenBookNow] = useState(false);
  const params = useParams();
  const idHotel = params.id;
  const getHotelDetail = async () => {
    const response = await fetch(`http://localhost:5000/detail/${idHotel}`);
    const data = await response.json();
    console.log(data);
    setHotelDetail(data);
  };
  useEffect(() => {
    getHotelDetail();
  }, []);

  const bookNowHandler = () => {
    setIsOpenBookNow((prev) => !prev);
  };
  console.log(isOpenBookNow);
  // Trả ra JSX code hiển thị phần hotel Details
  return (
    hotelDetail && (
      <div className={styles.hotelDetail}>
        <div className={styles.detailandreservebtn}>
          <div className={styles.detail}>
            <h3>{hotelDetail.name}</h3>
            <span className={styles.location}>
              <i className="fa-sharp fa-solid fa-location-dot"></i>
              {hotelDetail.address}
            </span>
            <span className={styles.distance}>
              Excellent location - {hotelDetail.distance}m from center
            </span>
            <span className={styles.price}>
              Book a stay over ${hotelDetail.cheapestPrice} at this property and
              get a free airport taxi
            </span>
          </div>
        </div>
        <div className={styles.pictures}>
          {hotelDetail.photos.map((image) => (
            <img src={image} />
          ))}
        </div>
        <div className={styles.descriptionanddeal}>
          <div className={styles.description}>
            <h3>{hotelDetail.title}</h3>
            <p>{hotelDetail.desc}</p>
          </div>
          <div className={styles.deal}>
            <span className={styles.nine_night_price}>
              <span>${hotelDetail.cheapestPrice} </span>
              (1 nights)
            </span>
            <button onClick={bookNowHandler}>Reserve or Book Now!</button>
          </div>
        </div>
        {isOpenBookNow && <ReserBookNow />}
      </div>
    )
  );
};
export default HotelDetail;
