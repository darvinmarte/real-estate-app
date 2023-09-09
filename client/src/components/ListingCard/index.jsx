import { Grid, Card, CardActions, CardMedia, CardActionArea, Typography,CardContent, Button
 } from "@mui/material";
import { useState } from "react";
import { Link } from 'react-router-dom';

const ListingCard =({listings}) =>{

    const [page, setPage] = useState(1);



if(listings == undefined){
    return (
        <div>
            LOADING DATA....
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
        <Grid spacing ={2} direction="row">

            {cardsToShow.map((listing) => (
            <Grid item key={listing.zpid}>
                <Link  to={`/listings/${listing.zpid}`}>
                <Card>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={listing.imgSrc}     
                    />
                    <CardContent>
                    <div>
                        <Typography gutterBottom variant="h5" component="div">
                            {listing.streetAddress}
                        </Typography>
                        <Typography gutterBottom variant="h4" component="div">
                            $ {listing.price.toLocaleString('en-US')} 
                        </Typography>
                    </div>
                        <Typography variant="body2" color="text.secondary">
                            Bedrooms:{listing.bedrooms}
                            Bahtrooms:{listing.bathrooms}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            </Link>
            </Grid>))}
        </Grid>
            <div>
                <Button onClick={handlePrevPage} disabled={page === 1}>
                    Previous Page
                </Button>
                <Button onClick={handleNextPage} disabled={endIndex >= listings.results.length}>
                    Next Page
                </Button>
            </div>  


        </div>
    )
    
 }
}
export default ListingCard;