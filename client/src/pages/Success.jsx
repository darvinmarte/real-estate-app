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
    <Grid className="textBox">
    <Box className="white-text marginTop">
            <Typography variant="h3">Success!</Typography>
            <Typography variant="h4">Thank you for your donation!</Typography>
            <Typography variant="h4">You will now be redirected to the home page</Typography>
    </Box>
    </Grid>
);
}

export default Success;