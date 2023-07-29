import React, { useEffect, useState } from "react";
import styles from "./SearchList.module.css";
import SearchListItem from "./SearchListItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginActions } from "../../store/store";
const SearchList = function () {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchList, setSearchList] = useState([]);
  const postSearchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/hotel/search`, {
        method: "POST",
        mode: "cors",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          destination: searchParams.get("des"),
          date: searchParams.get("date"),
          adult: Number(searchParams.get("adult")),
          children: Number(searchParams.get("children")),
          room: Number(searchParams.get("room")),
        }),
      });
      if (response.status === 401) {
        const errorMessage = await response.json();
        dispatch(loginActions.LOGOUT());
        navigate("/user?mode=login");
        throw new Error(errorMessage.message);
      }
      const data = await response.json();
      setSearchList(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    postSearchData();
  }, []);
  //Render ra list các Thẻ thông tin khách sạn trong danh sách tìm kiếm
  return (
    <div className={styles.searchList}>
      {searchList.length === 0 && (
        <h3 className={styles.message}>No Hotel Found!</h3>
      )}
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
