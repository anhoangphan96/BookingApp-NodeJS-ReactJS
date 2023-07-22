import { useNavigate } from "react-router-dom";

const HotelItem = (props) => {
  const navigate = useNavigate();
  const editHotelHandler = () => {
    navigate(`/hotel/formhotel?mode=update&id=${props.hotel._id}`);
  };

  return (
    <tr>
      <td>
        <input type="checkbox"></input>
      </td>
      <td>{props.hotel._id}</td>
      <td>{props.hotel.name}</td>
      <td>{props.hotel.type}</td>
      <td>{props.hotel.title}</td>
      <td>{props.hotel.city}</td>
      <td>
        <button onClick={editHotelHandler}>Edit</button>
        <button>Delete</button>
      </td>
    </tr>
  );
};
export default HotelItem;
