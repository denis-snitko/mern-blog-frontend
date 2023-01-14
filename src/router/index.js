import { createBrowserRouter } from "react-router-dom";
import { AddPost, FullPost, Home, Login, Registration } from "../pages";
import { Private } from "../hoc/Private";
import { AppLayout } from "../components/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      { path: "create", element: <Private><AddPost /></Private> },
      { path: "posts/:id/edit", element: <Private><AddPost /></Private> },
      { path: "posts/:id", element: <FullPost /> }
    ]
  }
]);