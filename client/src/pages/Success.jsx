import { useEffect } from "react";
import { Box, Grid, Typography } from '@mui/material'


function Success() {
    useEffect(() => {


        setTimeout(() => {
            window.location.assign("/");
        }, 3000);
    }

    );

return (
    <Grid>
    <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography >Success!</Typography>
        <Typography>Thank you for your donation!</Typography>
        <Typography>You will now be redirected to the home page</Typography>
    </Box>
    </Grid>
);
}

export default Success;