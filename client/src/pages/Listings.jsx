import { useState } from "react";
import {searchCity} from "../utils/API";

import {Button, Container, TextField} from '@mui/material';
import ListingCard from "../components/ListingCard";
// import { Container, TextField, Card, CardActions, CardMedia, CardActionArea, Typography,CardContent
//  } from "@mui/material";

import { useListings } from "../utils/ListingsContext";

const Listings = () => {
    // const [listings, setListings] = useState({});
    const { listings, updateListings } = useListings();
    const [searchQuery, setSearchQuery] = useState('');

    const handleFetchListings = async (searchThis) => {
        try {

            const data = await searchCity(searchThis);
            updateListings(data);
            console.log(data);


        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <main>
            
                <div>
                <TextField fullWidth label="Search Location" id="fullWidth" type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                    <Button variant = "contained" onClick={() => handleFetchListings(searchQuery)}>Search</Button>
                </div>


            <Container maxWidth="sm">
               
                <ListingCard listings= {listings} ></ListingCard>
               
            </Container>
        </main>
    );
};



export default Listings;
