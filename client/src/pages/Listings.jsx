import { useState, useEffect } from "react";
import {searchCity} from "../utils/API";

import { Button, Container, TextField, Stack, FormGroup, FormControlLabel , Switch, Typography, Box, Grid, Modal} from '@mui/material';
import ListingCard from "../components/ListingCard";


import { useListings } from "../utils/ListingsContext";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxwidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Listings = () => {
    const { listings, updateListings } = useListings();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter,setFilter] = useState(false);

    const sendFilter = filter ? 'forRent' : 'forSale';

    const handleFetchListings = async (searchThis) => {
        try {
            if(searchThis == ''){
                handleOpen();
            }else{

                const data = await searchCity(searchThis,sendFilter);
                updateListings(data);
            }

       

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) =>{
        setFilter(e.target.checked);
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <main>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="body1" component="h4">
                        I cant find nothing duuhh!
                    </Typography>
                    <Typography variant="body2" id="modal-modal-description" sx={{ mt: 2 }}>
                       Please enter a city, state or zipcode
                    </Typography>
                </Box>
            </Modal>
            <Container >
                <Stack direction="row" spacing={1} className="searchArea">

                <FormGroup className="searchForm">

                    <Stack direction="row" spacing={1} alignItems="center">
                    <Typography>For Sale</Typography>
                    <FormControlLabel control={<Switch />} color="primary" checked={filter} name="rent" onChange={handleChange} id="filter"/>
                   <Typography>For Rent</Typography>
                   </Stack>

                    <TextField  label="Search Location" id="fullWidth" type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}/>
                </FormGroup>
                <Grid direction="column" display="flex" justifyContent="end">
                <Button size="large" variant = "contained" onClick={() => handleFetchListings(searchQuery)}>Search</Button>
                </Grid>
                </Stack>
            </Container>


            <Container>
               
                <ListingCard listings= {listings} ></ListingCard>
               
            </Container>
        </main>
    );
};



export default Listings;
