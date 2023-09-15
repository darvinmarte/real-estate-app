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
    <Box className="main-text margin-top">
            <Typography variant="h3">Success!</Typography>
            <Typography variant="h4">Thank you for your donation!</Typography>
            <Typography variant="h4" className="margin-bottom-10">You will now be redirected to the home page</Typography>
    </Box>
    </Grid>
);
}

export default Success;