import { useState, useEffect } from "react";
import {searchCity} from "../utils/API";

import { Button, Container, TextField, Stack, FormGroup, FormControlLabel , Switch} from '@mui/material';
import ListingCard from "../components/ListingCard";
// import { Container, TextField, Card, CardActions, CardMedia, CardActionArea, Typography,CardContent
//  } from "@mui/material";

import { useListings } from "../utils/ListingsContext";

const Listings = () => {
    const { listings, updateListings } = useListings();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter,setFilter] = useState(false);

    let sendFilter
    useEffect(()=>{
        filter ? sendFilter = 'forRent' : sendFilter = 'forSale'
    
    },[filter])

    const handleFetchListings = async (searchThis) => {
        try {

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


    return (
        <main>
            
            <Container>
                <FormGroup>
                    <FormControlLabel  control={<Switch />} label="For Rent" checked={filter} name="rent" onChange={handleChange} id="filter"/>
                   
                    <TextField fullWidth label="Search Location" id="fullWidth" type="text"
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
