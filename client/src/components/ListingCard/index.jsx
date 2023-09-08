import { Card, CardActions, CardMedia, CardActionArea, Typography,CardContent
 } from "@mui/material";

import { Link } from 'react-router-dom';

const ListingCard =({listings}) =>{



if(listings == undefined){
    return (
        <div>
            LOADING DATA....
        </div>
    )
}else{

    return (
        <div>
            {listings.results.map((listing) => (
            <Link key={listing.zpid} to={`/listings/${listing.zpid}`}>
            <Card >
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
            </Card>
            </Link>

            ))}

        </div>
    )
    
 }
}
export default ListingCard;