import { useState, useEffect } from 'react';
import "./pages.css"

import ImageOne from "../assets/images/photo1.jpg"

import { Typography, Container, Card, CardContent, CardMedia, Button, CardActionArea, CardActions, Grid } from "@mui/material";

//images provided from unsplash.com
const images = ['./src/assets/images/photo1.jpg', './src/assets/images/photo2.jpg', './src/assets/images/photo3.jpg']
const texts = ['Photo by Daniel Barnes', 'Photo by Fernando Alvarez Rodriguez', 'Photo by John Fornander']

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
      <Container style={{paddingBottom: "4%"}}>
        <Typography className="welcomeText" variant="h6" style={{marginTop: "2%"}}>Welcome to PropertyPulse where you find your next home and learn all about it!</Typography>
        <div className="justify-center homepageContainer">
          <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="hero-image" />

          {/* <div className="text">{texts[currentIndex]}</div> */}
          {/* <Typography className="textOver" variant="h6">Welcome to PropertyPulse where you find your next home and learn all about it!</Typography> */}
        </div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/photo1.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Listings
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/photo2.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    PropertyTalk
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="../src/assets/images/photo3.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Login / SignUp
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>


    </main>
  );
};

export default Home;
