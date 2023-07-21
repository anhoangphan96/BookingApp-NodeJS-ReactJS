const HotelItem = (props) => {
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
        <button>Delete</button>
      </td>
    </tr>
  );
};
export default HotelItem;
