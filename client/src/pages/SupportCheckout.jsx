import {  useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { QUERY_CHECKOUT } from "..//utils/queries";
import Auth from "../utils/auth";
import { useLocation } from "react-router-dom"
import { useLazyQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function SupportCheckout() {
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const { state } = useLocation();
    const { amount } = state;

    useEffect(() => {
        if (data) {

            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);
    function submitCheckout() {
        getCheckout({
            variables: {
                amount: parseInt(amount),
            },
        });
    }

    return (
        <Box className="textBox">
            <Typography variant="h6" className="marginTop">You are donating <span className="dark-text">${amount}</span> to PropertyPulse. </Typography>
            <Typography variant="h6" className="white-text">PropertyPulse is thankful for your generosity!</Typography>
            <Typography variant="h6" className="white-text">If you wish to proceed, click the button to finish the checkout.</Typography>
            {Auth.loggedIn() ? (
                <Button variant="contained" size="large" onClick={submitCheckout}>Finish Checkout</Button>
            ) : (
                <p>Please login to finish your donation.</p>
            )}
        </Box>
    );
}