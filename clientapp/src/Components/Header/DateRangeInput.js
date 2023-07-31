import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import styles from "./DateRangeInput.module.css";
import { format, addDays } from "date-fns";
const DateRageInput = (props) => {
  //khai báo state cho biết người dùng có đang input hay không, khi vừa vào trang chủ hiển thị placeholder là true
  const [placeholder, setPlaceholder] = useState(true);
  // State date range mặc định gợi ý cho người dùng  ngày khởi hành là ngày hôm nay và ngày kết thúc là + 3 ngày
  const [ranges, setRanges] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);
  // Function xử lý khi người dùng chọn đủ startdate và enddate sẽ tự đóng popup và hiển thị ngày người dùng chọn
  const dateRangeHandler = function (ranges) {
    setRanges([ranges.selection]);
    if (ranges.selection.endDate > ranges.selection.startDate) {
      props.finishPick();
      setPlaceholder(false);
      setdatetodate(
        `${format(ranges.selection.startDate, "dd/MM/yyyy")} - ${format(
          ranges.selection.endDate,
          "dd/MM/yyyy"
        )}`
      );
      props.getDateRange(
        `${format(ranges.selection.startDate, "dd/MM/yyyy")} - ${format(
          ranges.selection.endDate,
          "dd/MM/yyyy"
        )}`
      );
    }
  };
  // khai báo phần tử dateRange để dùng điều kiện hiển thị trong JSX, nếu giá trị isOpenSub(trạng thái mở popup modal date) là true thì sẽ hiển thị modal còn nếu không sẽ tắt modal
  let dateRange = (
    <DateRange
      editableDateInputs={true}
      moveRangeOnFirstSelection={false}
      className="date"
      minDate={new Date()}
      onChange={dateRangeHandler}
      ranges={ranges}
    />
  );
  // Khai báo state chứa string date hiển thị sau khi người dùng chọn xong
  const [datetodate, setdatetodate] = useState(
    `${format(ranges[0].startDate, "dd/MM/yyyy")} - ${format(
      ranges[0].endDate,
      "dd/MM/yyyy"
    )}`
  );
  //Khai báo  function khi người dùng nhập input date và khi người dùng xóa
  const changeInputDateHandler = function (event) {
    props.getDateRange(event.target.value);
    setdatetodate(event.target.value);
    //Reset input về trạng thái ban đầu khi người dùng xóa hết input date
    if (event.target.value.trim().length === 0) {
      setPlaceholder(true);
      setRanges([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: "selection",
        },
      ]);
    }
  };
  //JSX section này trả ra thẻ icon thẻ input và 1 div hiển thị popup modal chọn date range
  return (
    <div className={`${styles.dateRange} ${styles.inputcontainer}`}>
      <i
        className={`fa-solid fa-calendar ${
          !placeholder ? styles.iconActive : ""
        }`}
      ></i>
      <input
        type="text"
        className="inputDate"
        placeholder={
          placeholder
            ? `${format(ranges[0].startDate, "dd/MM/yyyy")} - ${format(
                ranges[0].endDate,
                "dd/MM/yyyy"
              )}  `
            : ""
        }
        onChange={changeInputDateHandler}
        value={!placeholder ? datetodate : ""}
      />
      <div className={styles.calendar}>{props.isOpenSub && dateRange}</div>
    </div>
  );
};
export default DateRageInput;
