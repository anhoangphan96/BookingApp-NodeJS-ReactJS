import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import RootLayout from "./pages/RootLayout";
import Hotel from "./pages/Hotel";
import AddHotel from "./pages/AddHotel";
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
        { path: "/hotel", element: <Hotel></Hotel> },
        { path: "/hotel/addhotel", element: <AddHotel></AddHotel> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
