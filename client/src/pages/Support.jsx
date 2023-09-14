import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'
import { Button, Grid, TextField, Typography } from "@mui/material";


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
        <div className="textBox">
            {
                Auth.loggedIn() ? (
                    <Grid
                        container
                        direction="column"
                        // justifyContent="space-around"
                        alignItems="center"
                        >

                        <Typography variant="h6" className="marginTop">If you would like to support PropertyPulse by making a donation, you may do so below:</Typography>

                        <form className="flexBox marginTop">
                            <TextField id="outlined-basic" label="Amount" variant="outlined" type='number' value={amount} onChange={handleChange} />
                            <Button variant="contained" onClick={handleDonate}>Donate!</Button>
                        </form>

                    </Grid>
                ) : (
                    <Grid>
                    <Typography variant="h4" className="marginTop"> Please login to donate!</Typography>
                        </Grid>
                )
            }
        </div>
    )
}