import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import ListCity from "../../Components/List/ListCity";
import ListHotelType from "../../Components/List/ListHotelType";
import ListHotel from "../../Components/List/ListHotel";
import Subscribe from "../../Components/SubscribeForm/Subscribe";
import Footer from "../../Components/Footer/Footer";
const Home = () => {

  
  //State quản lý việc modal popup ở daterange có được mở hay đóng
  let [isOpenSub, setisOpenSub] = useState(false);
  //Khi người dùng chọn xong thì popup state sẽ được set thành false để ẩn đi
  const finishPick = function (finish) {
    setisOpenSub(false);
  };
  //Function xử lý việc click bất cứ đâu ngoài khu vực inputdate và daterange thì modal sẽ tắt đi
  const clickOuthandler = () => {
    if (window.event.target.classList.contains("inputDate")) {
      setisOpenSub(true);
    } else if (
      window.event.target.closest(".date") &&
      window.event.target.closest(".date").classList.contains("date")
    ) {
      setisOpenSub(true);
    } else {
      setisOpenSub(false);
    }
  };
  //Function xử lý việc khi nhấn Escape thì đóng modal
  const pressEsc = function () {
    window.event.key === "Escape" && setisOpenSub(false);
  };
  // Trả ra JSX trang home bằng các component đã được xây dựng
  return (
    <div onClick={clickOuthandler} onKeyDown={pressEsc}>
      <Navbar></Navbar>
      <Header isOpenSub={isOpenSub} finishPick={finishPick}></Header>
      <ListCity></ListCity>
      <ListHotelType></ListHotelType>
      <ListHotel></ListHotel>
      <Subscribe></Subscribe>
      <Footer></Footer>
    </div>
  );
};

export default Home;
