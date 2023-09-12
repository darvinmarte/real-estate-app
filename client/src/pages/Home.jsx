import { useState, useEffect } from 'react';
import "./pages.css"

import { Typography, Container } from "@mui/material";

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
      <Container>
      <div className="justify-center homepageContainer">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className ="hero-image"/>
        <div className="text">{texts[currentIndex]}</div>
        <Typography className="textOver" variant="h6">Welcome to PropertyPulse where you find your next home and learn all about it!</Typography>
      </div>
      
      </Container>
    </main>
  );
};

export default Home;
