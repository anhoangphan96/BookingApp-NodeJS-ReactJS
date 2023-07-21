import Card from "../Components/CardContainer/Card";

const AddHotel = () => {
  return (
    <>
      <Card>
        <h3>Add New Product</h3>
      </Card>
      <Card>
        <form>
          <label htmlFor="name">Name</label>
          <input id="name" type="text" placeholder="My Hotel"></input>
          <label htmlFor="type">Type</label>
          <input id="type" type="text" placeholder="hotel"></input>
          <label htmlFor="city">City</label>
          <input id="city" type="city" placeholder="New York"></input>
          <label htmlFor="address">Adress</label>
          <input id="address" type="text" placeholder="elton st, 216"></input>
          <label htmlFor="distance">Distance from City Center(m)</label>
          <input id="distance" type="number" placeholder="500"></input>
          <label htmlFor="title">Title</label>
          <input id="title" type="text" placeholder="The best Hotel"></input>
          <label htmlFor="description">Description</label>
          <input id="description" type="text" placeholder="Description"></input>
          <label htmlFor="price">Price</label>
          <input id="price" type="number" placeholder="100"></input>
          <label htmlFor="image">Image</label>
          <textarea id="image" type="text"></textarea>
          <label htmlFor="featured">Featured</label>
          <select id="featured">
            <option>No</option>
          </select>
          <label htmlFor="room">Rooms</label>
          <textarea id="room" type="text"></textarea>
          <button>Send</button>
        </form>
      </Card>
    </>
  );
};
export default AddHotel;
