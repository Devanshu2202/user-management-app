import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserDetails from "./pages/UserDetails";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/users/new" element={<AddUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;