import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
// import "./App.css";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import Tickets from "./components/Tickets";
import Modal from "./components/Modal";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/tickets" element={<Tickets />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
