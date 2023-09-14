import './footer.css'
import { Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer  className="myfooter">
      <Typography>
        &copy; 2023 All Rights Reserved
      </Typography>
        <Button variant="outlined"  component={Link} to="/support" >Click here to support</Button>
    </footer>
  );
};

export default Footer;
