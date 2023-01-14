import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import Container from "@mui/material/Container";

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

