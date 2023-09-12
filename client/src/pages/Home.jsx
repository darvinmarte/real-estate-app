import { useState, useEffect } from 'react';
import "./pages.css"

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
      <div className="justify-center">
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className ="hero-image"/>
        <div className="text">{texts[currentIndex]}</div>
        {/* <div className="textOver">Text over</div> */}
      </div>
      
      
    </main>
  );
};

export default Home;
