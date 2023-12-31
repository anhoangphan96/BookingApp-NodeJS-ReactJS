import React, { useEffect, useState } from "react";
import styles from "./ListHotel.module.css";
import HotelItem from "./HotelItem";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/store";
const ListHotel = function (props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [listHotel, setListHotel] = useState([]);
  const getDataListHotel = async () => {
    try {
      console.log(process.env.REACT_APP_BACKEND_URL);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/hotel/listhotel`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );
      const data = await response.json();

      setListHotel((prev) => {
        return data.map((hotel) => {
          return {
            id: hotel._id,
            name: hotel.name,
            city: hotel.city,
            price: hotel.cheapestPrice,
            rate: hotel.rating,
            //Ở trang homepage ảnh sẽ lấy ảnh đầu tiên trong array ảnh lưu ở database
            image_url: hotel.photos[0],
          };
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataListHotel();
  }, []);
  // Trả ra JSX code gồm list các Hotel được render bằng cách gọi phương thức map cho array

  return (
    <div className={styles.container}>
      <h2>Homes guests love</h2>
      <div className={styles.hotelList}>
        {listHotel.map((hotel) => {
          return (
            <HotelItem
              key={hotel.id}
              id={hotel.id}
              name={hotel.name}
              city={hotel.city}
              price={hotel.price}
              rate={hotel.rate}
              image={hotel.image_url}
            />
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(ListHotel);
