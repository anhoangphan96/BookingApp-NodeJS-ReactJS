import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashBoard></DashBoard>,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
