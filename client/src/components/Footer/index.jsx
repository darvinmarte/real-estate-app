import './footer.css'
import { Typography, Button } from "@mui/material";
import { Link } from 'react-router-dom'

const Footer = () => {

  return (
    <footer>
      <Typography className="myfooter">
        &copy; 2023 All Rights Reserved
       <Button component={Link} to="/support" >Click here to support</Button>
      </Typography>
    </footer>
  );
};

export default Footer;
