import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import img1 from "../Images/autorent.jpeg";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Features/UserSlice";

const Header = () => {
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
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link onClick={handlelogout}>Logout</Link>
          </NavItem>
          <NavItem>
            <Link to="/about">About us</Link>
          </NavItem>
          
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
