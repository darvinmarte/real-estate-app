import { Card, CardActions, CardMedia, CardActionArea, Typography,CardContent
 } from "@mui/material";


const ListingCard =({listings}) =>{



if(listings == undefined){
    return (
        <div>
            LOADING DATA....
        </div>
    )
}else{
    const listingData = listings;
    return (
        <div>
            {listingData.results.map((listing) => (

            <Card key={listing.zpid}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        // height="140"
                        image={listing.imgSrc}
                    // alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {listing.streetAddress}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {listing.price}$
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Bedrooms:{listing.bedrooms}
                            Bahtrooms:{listing.bathrooms}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {/* <Button size="small" color="primary">
                        Share
                    </Button> */}
                </CardActions>
            </Card>

            ))}

        </div>
    )
    
 }
}
export default ListingCard;