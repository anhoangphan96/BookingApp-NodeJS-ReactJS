import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RootLayout from "./pages/RootLayout";
import Hotel from "./pages/Hotel";
import FormHotel from "./pages/FormHotel";
import Room from "./pages/Room";
import FormRoom from "./pages/FormRoom";
import Transaction from "./pages/Transaction";
import User from "./pages/User";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout></RootLayout>,
      children: [
        {
          index: true,
          element: <DashBoard></DashBoard>,
        },
        { path: "/user", element: <User></User> },
        { path: "/hotel", element: <Hotel></Hotel> },
        { path: "/hotel/formhotel", element: <FormHotel></FormHotel> },
        { path: "/room", element: <Room></Room> },
        { path: "/room/formroom", element: <FormRoom></FormRoom> },
        { path: "/transaction", element: <Transaction></Transaction> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
