import { useState, useEffect } from "react";
import {searchCity} from "../utils/API";

import { Button, Container, TextField, Stack, FormGroup, FormControlLabel , Switch, Typography} from '@mui/material';
import ListingCard from "../components/ListingCard";
// import { Container, TextField, Card, CardActions, CardMedia, CardActionArea, Typography,CardContent
//  } from "@mui/material";

import { useListings } from "../utils/ListingsContext";

const Listings = () => {
    const { listings, updateListings } = useListings();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter,setFilter] = useState(false);

    const sendFilter = filter ? 'forRent' : 'forSale';

    const handleFetchListings = async (searchThis) => {
        try {
            console.log(sendFilter)
            const data = await searchCity(searchThis,sendFilter);
            updateListings(data);
            console.log(data);

       

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) =>{
        setFilter(e.target.checked);
    }
//switch



    return (
        <main>
            
            <Container>
                <FormGroup>

                    <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>For Sale</Typography>
                    <FormControlLabel control={<Switch />} color="primary" checked={filter} name="rent" onChange={handleChange} id="filter"/>
                   <Typography>For Rent</Typography>
                   </Stack>

                    <TextField  label="Search Location" id="fullWidth" type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
                </FormGroup>
                <Button variant = "contained" onClick={() => handleFetchListings(searchQuery)}>Search</Button>
            </Container>


            <Container>
               
                <ListingCard listings= {listings} ></ListingCard>
               
            </Container>
        </main>
    );
};



export default Listings;
