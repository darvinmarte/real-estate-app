// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import './index.css'



import Auth from '../../utils/auth';
import SvgIcon from '@mui/material/SvgIcon';

const Header = () => {
  const currentPage = useLocation().pathname;
  console.log(currentPage);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  return (
    <Navbar expand="lg" className="navbar-fill">
      <Container className="container text-center">
        <Navbar.Brand href="/"><HomeIcon fontSize="large" className="icon" color="primary" /> PropertyPulse </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-dark' />
        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
          <Nav className="navbar">
            <Nav.Link className={currentPage.includes('/listings') ? 'active' : 'notactive'} href="/listings">Listings</Nav.Link>
            <Nav.Link className={currentPage.includes('/forum') ? 'active' : 'notactive'} href="/forum">PropertyTalks</Nav.Link>

            {Auth.loggedIn() ? (
              <>
                <Nav.Link className={currentPage == '/logout' ? 'active' : 'notactive'}  onClick={logout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                  <Nav.Link className={currentPage == '/login' ? 'active' : 'notactive'} href="/login">Login</Nav.Link>
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

