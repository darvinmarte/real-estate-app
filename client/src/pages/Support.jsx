import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";


export default function Support() {

    const [amount, setAmount] = useState(0)
    const navigate = useNavigate()
    const handleChange = (event) => {
        setAmount(event.target.value)
    }
    const handleDonate = (event) => {
        event.preventDefault()
        const donation = { donorId: Auth.getProfile().data._id }
        localStorage.setItem('donation', JSON.stringify(donation))
        navigate('/checkout', { state: { amount } })
    }

    return (
        <Grid 
            container 
            direction="column"
            justifyContent="space-between"
            alignItems="center">
    
            <Typography>If you would like to support PropertyPulse by making a donation, you may do so below:</Typography>

            <form>
                <TextField id="outlined-basic" label="Amount" variant="outlined" type='number' value={amount} onChange={handleChange} />
                <Button onClick={handleDonate}>Donate!</Button>
            </form>

        </Grid>
    )
    }