import React, { useState } from "react";
import styles from "./HeaderSearch.module.css";
import "font-awesome/css/font-awesome.min.css";
import DateRageInput from "./DateRangeInput";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchActions } from "../../store/store";
const HeaderSearch = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Xây dựng các phần tử trong thanh search trên Header
  //2 giá trị State để biết người dùng có đang input hay không, nếu người dùng input thì icon và chữ sẽ màu đen, còn không thì sẽ xám đi
  const [inputWhere, setInputWhere] = useState("");
  const [inputPerson, setInputPerson] = useState("");
  const [dateRange, setDateRange] = useState("");
  //2 function xử lý việc input của người dùng
  const inputWhereHandler = (event) => {
    setInputWhere(event.target.value);
  };
  const inputPersonHandler = (event) => {
    setInputPerson(event.target.value);
  };
  //Function để lift state datetodate lấy input date từ component DateRangInput lên
  const getDateRange = (datetodate) => {
    setDateRange(datetodate);
  };
  //Function khi người dùng click vào nút Search sẽ chuyển đến Search page
  const seachHandler = (event) => {
    event.preventDefault();
    dispatch(
      searchActions.GETSEARCH({
        destination: inputWhere,
        date: dateRange,
        person: inputPerson,
      })
    );
    navigate("/search");
  };
  //JSX trả ra ở component này là 3 ô input gồm icon thẻ inbut và 1 button search
  return (
    <form onSubmit={seachHandler} className={styles.searchBar}>
      <div className={styles.inputcontainer}>
        <i
          className={`fa-solid fa-bed ${inputWhere ? styles.iconActive : ""}`}
        ></i>
        <input
          type="text"
          placeholder="Where you are going?"
          onChange={inputWhereHandler}
          value={inputWhere}
        />
      </div>
      <DateRageInput
        isOpenSub={props.isOpenSub}
        finishPick={props.finishPick}
        getDateRange={getDateRange}
      />
      <div className={styles.inputcontainer}>
        <i
          className={`fa-solid fa-person ${
            inputPerson ? styles.iconActive : ""
          }`}
        ></i>
        <input
          type="text"
          placeholder="1 adult - 0 children - 1 room"
          onChange={inputPersonHandler}
          value={inputPerson}
        />
      </div>
      <button className={styles.btnSearch}>Search</button>
    </form>
  );
};
export default HeaderSearch;
