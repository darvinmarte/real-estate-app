import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="container text-center">
        This is header with a link 
        <Link to="/">
          <h1>
            Home
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
