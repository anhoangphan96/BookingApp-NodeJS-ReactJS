import React from "react";
import Column from "./Column";
import styles from "./Footer.module.css";
const Footer = function () {
  const footerArr = [
    {
      col_number: 1,
      col_values: [
        "Countries",
        "Regions",
        "Cities",
        "Districts",
        "Airports",
        "Hotels",
      ],
    },
    {
      col_number: 2,
      col_values: [
        "Homes",
        "Apartments",
        "Resorts",
        "Villas",
        "Hostels",
        "Guest houses",
      ],
    },
    {
      col_number: 3,
      col_values: [
        "Unique places to stay",
        "Reviews",
        "Unpacked: Travel articles",
        "Travel communities",
        "Seasonal and holiday deals",
      ],
    },
    {
      col_number: 4,
      col_values: [
        "Car rental",
        "Flight Finder",
        "Restaurant reservations",
        "Travel Agents",
      ],
    },
    {
      col_number: 5,
      col_values: [
        "Curtomer Service",
        "Partner Help",
        "Careers",
        "Sustainability",
        "Press center",
        "Safety Resource Center",
        "Investor relations",
        "Terms & conditions",
      ],
    },
  ];
  // Trả ra JSX hiển thị danh sách 5 column, mỗi column có các link thông tin khác nhau hiển thị ở footer
  return (
    <div className={styles.container}>
      <div className={styles.footer}>
        {footerArr.map((arr) => (
          <Column
            key={arr.col_number}
            number={arr.col_number}
            value={arr.col_values}
          />
        ))}
      </div>
    </div>
  );
};
export default Footer;
