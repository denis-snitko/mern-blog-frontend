import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";

export const Private = ({ children }) => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  
  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to={"/login"} state={{ from: location }} />;
  }
  
  return children;
};

