import React, { useCallback, useEffect, useState } from "react";
import styles from "./ListCity.module.css";
import CityItem from "./CityItem";
const ListCity = function (props) {
  const [listCity, setListCity] = useState([
    {
      name: "Ha Noi",
      subText: "0 properties",
      image: "./images/HaNoi.jpg",
    },
    {
      name: "Ho Chi Minh",
      subText: "0 properties",
      image: "./images/HCM.jpg",
    },
    {
      name: "Da Nang",
      subText: "0 properties",
      image: "./images/DaNang.jpg",
    },
  ]);
  const getDataListCity = async function () {
    const response = await fetch("http://localhost:5000/home/listcity");
    const data = await response.json();
    //Set state mới từ data backend gửi lên cho listCity
    setListCity((prev) => {
      const updateListCity = [...prev].map((city) => {
        //index của city từ data backend fetch lên
        const index = data.findIndex((c) => {
          return c.city === city.name;
        });
        //Cập nhật số hotel(properties có ở mỗi thành phố )
        const updateCity =
          index >= 0
            ? {
                ...city,
                subText: `${data[index].properties} properties`,
              }
            : { ...city };

        return updateCity;
      });
      return updateListCity;
    });
  };
  useEffect(() => {
    getDataListCity();
  }, []);
  // Trả ra JSX code gồm các city được render bằng cách gọi phương thức map cho array
  return (
    <div className={styles.cityList}>
      {listCity.map((city) => {
        return (
          <CityItem
            key={city.name}
            name={city.name}
            subText={city.subText}
            image={city.image}
          />
        );
      })}
    </div>
  );
};
export default React.memo(ListCity);
