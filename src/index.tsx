import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./AppRoutes";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
