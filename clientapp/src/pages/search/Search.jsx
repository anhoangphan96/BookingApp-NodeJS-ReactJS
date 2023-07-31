import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import SearchList from "../../Components/SearchPage/SearchList";
import Footer from "../../Components/Footer/Footer";
import SearchPopup from "../../Components/SearchPage/SearchPopup";
import styles from "./Search.module.css";

const Search = () => {
  // Trả ra JSX code hiển thị phần search tái sử dụng phần Navbar và Footer
  return (
    <div>
      <Navbar></Navbar>
      <div>
        <div className={styles.searchPage}>
          <SearchPopup></SearchPopup>
          <SearchList></SearchList>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Search;
