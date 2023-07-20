import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import HotelDetail from "../../Components/HotelDetail/HotelDetail";

const Detail = () => {
  //Trả ra JSX code hiển thị phần detail hotel tái sử dụng phần Navbar, footer và subscribe.
  return (
    <div>
      <Navbar></Navbar>
      <HotelDetail></HotelDetail>
      <Footer></Footer>
    </div>
  );
};

export default Detail;
