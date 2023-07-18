import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Subscribe from "../../Components/SubscribeForm/Subscribe";
import HotelDetail from "../../Components/HotelDetail/HotelDetail";

const Detail = () => {
  //Trả ra JSX code hiển thị phần detail hotel tái sử dụng phần Navbar, footer và subscribe.
  return (
    <div>
      <Navbar></Navbar>
      <HotelDetail></HotelDetail>
      <Subscribe></Subscribe>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
