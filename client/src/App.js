import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import Header from "./Components/Header";
import AdminHeader from "./Components/AdminHeader"; 
import Home from "./Components/Home";
import Login from "./Components/Login";
import { Container, Row } from "reactstrap";
import Footer from "./Components/Footer";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import UserList from "./Components/UserList";
import ManageCars from "./Components/ManageCars";
import AddCars from "./Components/AddCars";
import UpdateCar from "./Components/UpdateCars";
import CarInfos from "./Components/CarInfos";
import About from "./Components/About";
import Booking from "./Components/Booking";
const App = () => {
  const Layout = () => {
    const location = useLocation();

    
    const adminPaths = ["/managecars", "/addcar", "/updatecar", "/userlist","/booking"];
    const isAdminPage = adminPaths.some((path) =>
      location.pathname.startsWith(path)
    );

    return (
      <>
        <Row>
          {isAdminPage ? <AdminHeader /> : <Header />}
        </Row>

        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/managecars" element={<ManageCars />} />
            <Route path="/addcar" element={<AddCars />} />
            <Route path="/updatecar/:id" element={<UpdateCar />} />
            <Route path="/carinfos/:id" element={<CarInfos />} />
            <Route path="/about/" element={<About />} />
            <Route path="/booking" element={<Booking/>} />
          </Routes>
        </Row>

        <Row>
          <Footer />
        </Row>
      </>
    );
  };

  return (
    <Container fluid>
      <Router>
        <Layout />
      </Router>
    </Container>
  );
};

export default App;
