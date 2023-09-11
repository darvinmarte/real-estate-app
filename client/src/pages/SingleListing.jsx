import { useParams } from 'react-router-dom';
import { searchbyID } from '../utils/API';
import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, CardActionArea, CardActions, Grid, Container,Stack,Box } from "@mui/material";
import CommentList from '../components/CommentList'
import CommentForm from '../components/CommentForm'
// zID is the id of the listing 
import "./pages.css"
const SingleListing = () => {
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

    if (!data) {
        console.log('No Data');
        return (
            <div>
                Loading..
            </div>
        )
    } else {
        console.log(data);
        const currentImage = data.big[currentImageIndex].url;

        //card to display
        //images
        //description

        //div for comments
        return (
            <>
                <Container >
                    <Grid container spacing={2}>
                        <Grid item lg={6} >
                            
                        <Box>
                            <img src={currentImage} />
                        </Box>

                            <Stack direction="row" spacing={2}>
                                <Button onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                                    Previous Image
                                </Button>
                                <Button onClick={handleNextImage} disabled={currentImageIndex === data.big.length - 1}>
                                    Next Image
                                </Button>
                            </Stack>
                        </Grid>
                    <Grid item lg={6}>


                        <Container >
                            <Typography gutterBottom variant="h5" component="div">
                                Price: ${data.price.toLocaleString()}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="div">
                                Address: {data.address.streetAddress} , {data.address.city}, {data.address.state} {data.address.zipcode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Number of bedrooms: {data.bedrooms}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Number of bathrooms: {data.bathrooms}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                {data.description}
                            </Typography>
                        </Container>
                    </Grid>

                    </Grid>
            
                

                </Container>
                
                <CommentList zID={zID} />

                <CommentForm />
            </>
        )

    }

}


export default SingleListing;