import React, { useEffect, useState, useCallback } from "react";
import styles from "./ListHotelType.module.css";
import HotelTypeItem from "./HotelTypeItem";
const ListHotelType = function (props) {
  const [listHotelType, setListHotelType] = useState([
    {
      name: "Hotels",
      count: 0,
      image: "./images/type_1.webp",
    },
    {
      name: "Apartments",
      count: 0,
      image: "./images/type_2.jpg",
    },
    {
      name: "Resorts",
      count: 0,
      image: "./images/type_3.jpg",
    },
    {
      name: "Villas",
      count: 0,
      image: "./images/type_4.jpg",
    },
    {
      name: "Cabins",
      count: 0,
      image: "./images/type_5.jpg",
    },
  ]);

  const getDataListHotelType = async () => {
    const response = await fetch("http://localhost:5000/home/listhoteltype");
    const data = await response.json();
    setListHotelType((prev) => {
      const updateListHotelType = [...prev];
      data.forEach((t) => {
        const index = prev.findIndex(
          (type) => type.name.toLowerCase() === t.type.toLowerCase()
        );
        updateListHotelType[index].count = t.count;
      });
      return updateListHotelType;
    });
  };
  useEffect(() => {
    getDataListHotelType();
  }, []);

  // Trả ra JSX code gồm List các Hotel type được render bằng cách gọi phương thức map cho array
  return (
    <div className={styles.container}>
      <h2>Browse by property type</h2>
      <div className={styles.hotelTypeList}>
        {listHotelType.map((hotel) => {
          return (
            <HotelTypeItem
              key={hotel.name}
              name={hotel.name}
              count={hotel.count}
              image={hotel.image}
            />
          );
        })}
      </div>
    </div>
  );
};
export default React.memo(ListHotelType);
