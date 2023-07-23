import React, { useEffect, useState } from "react";
import styles from "./SearchList.module.css";
import SearchListItem from "./SearchListItem";
import { useSelector } from "react-redux";
const SearchList = function () {
  const searchData = useSelector((state) => state.search);
  const [searchList, setSearchList] = useState([]);
  const postSearchData = async () => {
    const response = await fetch(`http://localhost:5000/search`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(searchData),
    });
    const data = await response.json();
    setSearchList(data);
  };

  useEffect(() => {
    postSearchData();
  }, [searchData]);
  console.log(searchList);
  //Render ra list các Thẻ thông tin khách sạn trong danh sách tìm kiếm
  return (
    <div className={styles.searchList}>
      {searchList.map((item) => (
        <SearchListItem
          key={item._id}
          id={item._id}
          name={item.name}
          distance={item.distance}
          city={item.city}
          type={item.rooms.map((room) => room.title).join(" - ")}
          description={item.type}
          price={item.cheapestPrice}
          rate={item.rating}
          image_url={item.photos[0]}
        />
      ))}
    </div>
  );
};
export default SearchList;
