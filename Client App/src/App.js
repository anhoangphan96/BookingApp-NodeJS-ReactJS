import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import User from "./pages/user/User";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "./store/store";
import Transaction from "./pages/transaction/Transaction";

function App() {
  const dispatch = useDispatch();
  //Nhớ làm cái catch error
  const checkLogin = async () => {
    const response = await fetch("http://localhost:5000/user/checklogin", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    console.log(data);
    if (data.isLoggedIn) {
      dispatch(loginActions.LOGIN({ username: data.username }));
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
    },
    { path: "/search", element: <Search></Search> },
    { path: "/hotel/:id", element: <Detail></Detail> },
    { path: "/user", element: <User></User> },
    { path: "/transaction", element: <Transaction></Transaction> },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
