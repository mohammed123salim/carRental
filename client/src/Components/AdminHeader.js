import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import img1 from "../Images/autorent.jpeg";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlelogout = async () => {
    dispatch(logout());
    //ensure that the state update from the logout action has been processed before proceeding to the next step.
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/"); //redirect to login page route.
  };

  return (
    <>
      <Navbar>
        <Nav>
          <NavItem>
            <img src={img1} />
          </NavItem>
          <NavItem>
            <Link to="/managecars">Manage Cars</Link>
          </NavItem>
          <NavItem>
            <Link to="/userlist">Users</Link>
          </NavItem>
          <NavItem>
            <Link to="/booking">Bookings</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>
          
        </Nav>
      </Navbar>
    </>
  );
};

export default AdminHeader;
