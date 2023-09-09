import { useParams } from 'react-router-dom';
import {searchbyID} from '../utils/API';
import { useState,useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActionArea, CardActions  } from "@mui/material";
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
// zID is the id of the listing 

const SingleListing = () =>{
    const { zID } = useParams();
    const [data, setData] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await searchbyID(zID);
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [zID]);


    const handleNextImage = () => {
        if (data && currentImageIndex < data.big.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePrevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    if(!data){
    console.log('No Data');
    return (
        <div>
            Loading..
        </div>
    )
}else{
    console.log(data.big);
        const currentImage = data.big[currentImageIndex].url;
        
    //card to display
    //images
    //description

    //div for comments
    return( 
        <>
        <Card >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="400"
                    image={currentImage}
                // alt="green iguana"
                />

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                    Previous Image
                </Button>
                <Button onClick={handleNextImage} disabled={currentImageIndex === data.big.length - 1}>
                    Next Image
                </Button>
            </CardActions>

        </Card>

        <CommentList zID={zID} />

        <CommentForm />
        </>
    )

}

}


export default SingleListing;