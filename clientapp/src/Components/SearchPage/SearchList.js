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
  const [errorMessage, setErrorMessage] = useState("No Hotel found");
  const postSearchData = async () => {
    try {
      const response = await fetch(`${process.env.backend_url}/hotel/search`, {
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
        dispatch(loginActions.LOGOUT());
        navigate("/user?mode=login");
      } else if (response.status === 400) {
        const errorText = await response.json();
        setErrorMessage(errorText);
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
        <h3 className={styles.message}>{errorMessage}</h3>
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
