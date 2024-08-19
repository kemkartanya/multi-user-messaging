import "./App.css";
import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
