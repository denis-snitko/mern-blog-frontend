import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAuth } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!window.localStorage.getItem("token")) {
      return;
    }
    dispatch(fetchAuth());
  }, [dispatch]);
  
  return (<RouterProvider router={router} />);
}

export default App;
