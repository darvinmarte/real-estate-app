// eslint-disable-next-line no-unused-vars
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import SignOut from '../SignOut'



import Auth from '../../utils/auth';


const Header = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Navbar expand="lg" className="navbar-fill">
      <Container className="container text-center">
        <Navbar.Brand href="/">PropertyPulse</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="navbar">
            <Nav.Link href="/listings">Listings</Nav.Link>
            <Nav.Link href="/forum">PropertyTalks</Nav.Link>

            {Auth.loggedIn() ? (
              <>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}

            {/* <Nav.Link href="/signup">Signup</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default Header;

