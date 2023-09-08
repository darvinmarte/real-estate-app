import React, { useState, useEffect } from 'react';
import "./pages.css"

//images provided from unsplash.com
const images = ['../public/images/daniel-barnes-RKdLlTyjm5g-unsplash.jpg', '../public/images/fernando-alvarez-rodriguez-M7GddPqJowg-unsplash.jpg', '../public/images/john-fornander-Id7u0EkTjBE-unsplash.jpg']
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
      {/* <div className="justify-center"> */}
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className ="hero-image"/>
        <div className="text">{texts[currentIndex]}</div>
      {/* </div> */}
    </main>
  );
};

export default Home;
