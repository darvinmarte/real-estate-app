import { useState, useEffect } from 'react';
import "./pages.css"

import { Link } from 'react-router-dom';

import photo1 from '../assets/images/photo1.jpg';
import photo2 from '../assets/images/photo2.jpg';
import photo3 from '../assets/images/photo3.jpg';

import listingsphoto from "../assets/images/listingsphoto.jpg";
import talksphoto from "../assets/images/talksphoto.jpg";
import signupphoto from "../assets/images/signupphoto.jpg"

import { Typography, Container, Card, CardContent, CardMedia, Button, CardActionArea, CardActions, Grid } from "@mui/material";

//images provided from unsplash.com
const images = [photo1, photo2, photo3]
// const texts = ['Photo by Daniel Barnes', 'Photo by Fernando Alvarez Rodriguez', 'Photo by John Fornander']

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <main>
      <Container style={{ paddingBottom: "4%" }}>
        <Typography className="welcomeText" variant="h6" style={{ marginTop: "2%" }}>Welcome to PropertyPulse where you find your next home and learn all about it!</Typography>
        <div className="justify-center homepageContainer">
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="hero-image" />

          {/* <div className="text">{texts[currentIndex]}</div> */}
          {/* <Typography className="textOver" variant="h6">Welcome to PropertyPulse where you find your next home and learn all about it!</Typography> */}
        </div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ sm: 4, md: 12 }}>
          <Grid className='homepageCard' item md={4}>
            
              <Card sx={{ maxWidth: 345 }}>
              <Link to="/listings">
                  <CardMedia
                    component="img"
                    height="140"
                    image={listingsphoto}
                    alt="listings photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Listings
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Browse listings below for rent and for sale.
                    </Typography>
                  </CardContent>
            </Link>
                <CardActions>
                  <Link to="/listings">
                    <Button size="small" color="primary">
                      Click here
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            
          </Grid>

          <Grid className='homepageCard' item md={4}>
            
              <Card sx={{ maxWidth: 345 }}>
              <Link to="/forum">
                  <CardMedia
                    component="img"
                    height="140"
                  image={talksphoto}
                    alt="talk photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      PropertyTalk
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Join conversations about all things real estate.
                    </Typography>
                  </CardContent>
                </Link>
                <CardActions>
                  <Link to="/forum">
                    <Button size="small" color="primary">
                      Click here
                    </Button> </Link>
                </CardActions>
              </Card>
            
          </Grid>

          <Grid className='homepageCard' item md={4}>
            
              <Card sx={{ maxWidth: 345 }}>
            <Link to="/login">
             
                  <CardMedia
                    component="img"
                    height="140"
                    image={signupphoto}
                    alt="signup photo"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      Login / SignUp
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Login or SignUp for full experience.
                    </Typography>
                  </CardContent>
             
            </Link>
                <CardActions>
                  <Link to="/login">
                    <Button size="small" color="primary">
                      Click here
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            
          </Grid>
        </Grid>
      </Container>


    </main>
  );
};

export default Home;
