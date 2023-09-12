import { Grid, Card, Stack, CardMedia, CardActionArea, Typography,CardContent, Button, Container
 } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';
const ListingCard =({listings}) =>{

    const [page, setPage] = useState(1);



if(!listings){
    return (
        <div>
          
        </div>
    )
}else{

    
    // Calculate the start and end indexes for the current page
    const startIndex = (page - 1) * 6;
    const endIndex = startIndex + 6;

    // Slice the array to get the cards for the current page
    const cardsToShow = listings.results.slice(startIndex, endIndex);

    const handlePrevPage = () => {
        setPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
           
        <Grid container spacing={3} >

            {cardsToShow.map((listing) => (
            <Grid item key={listing.zpid} className="post" md={4}>
                <Link  to={`/listings/${listing.zpid}`}>
                <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={listing.imgSrc}     
                    />
                    <CardContent>
                    <div>
                        <Typography gutterBottom variant="h6" component="div">
                            {listing.streetAddress}, {listing.city}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            $ {listing.price.toLocaleString('en-US')} 
                        </Typography>
                    </div>
                        <Typography variant="body2" color="text.secondary">
                            Bedrooms: {listing.bedrooms}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                             Bahtrooms: {listing.bathrooms}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>
            </Grid>))}
        </Grid>
            <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
                    Previous Page
                </Button>
                <Button variant="contained" onClick={handleNextPage} disabled={endIndex >= listings.results.length}>
                    Next Page
                </Button>
            </Stack> 


        </div>
    )
    
 }
}
export default ListingCard;