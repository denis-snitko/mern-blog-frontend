import { createBrowserRouter } from "react-router-dom";
import { AddPost, FullPost, Home, Login, Registration, Profile } from "../pages";
import { Private } from "../hoc/Private";
import { AppLayout } from "../components/AppLayout";
import { Tags } from "../pages/Tags";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/popular", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Registration /> },
      { path: "profile", element:  <Private><Profile /></Private> },
      { path: "create", element: <Private><AddPost /></Private> },
      { path: "posts/:id/edit", element: <Private><AddPost /></Private> },
      { path: "posts/:id", element: <FullPost /> },
      { path: "tags/:tag", element: <Tags /> }
    ]
  }
]);