import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";

import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>
);
