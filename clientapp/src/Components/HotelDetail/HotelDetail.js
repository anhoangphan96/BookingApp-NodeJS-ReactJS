import React, { useEffect, useState } from "react";
import styles from "./HotelDetail.module.css";
import { useParams } from "react-router-dom";
import ReserBookNow from "./ReserBookNow";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/store";
const HotelDetail = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hotelDetail, setHotelDetail] = useState(null);
  const [isOpenBookNow, setIsOpenBookNow] = useState(false);
  const params = useParams();
  const idHotel = params.id;
  const getHotelDetail = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/hotel/detail/${idHotel}`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      if (response.status === 401) {
        const errorMessage = await response.json();
        dispatch(loginActions.LOGOUT());
        navigate("/user?mode=login");
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      console.log(data);
      setHotelDetail(data);
    } catch (err) {
      console.log(err);
    }
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
          {hotelDetail.photos.map((image, i) => (
            <img src={image} key={i + 1} />
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
