import Auth from '../../utils/auth'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom';
import { TextField, Button, FormGroup } from '@mui/material'
import { ADD_LISTING_COMMENT } from '../../utils/mutations';


//need comment from user
//do mutation - mutation will expect userName, use utils auth.js getprofile().data.name
//send muation on a click


export default function CommentForm() {

    const { zID } = useParams();
    const [comment, setComment] = useState('');
    const authorName = Auth.getProfile().data.name;
    const [addListingComment,{error}] = useMutation(ADD_LISTING_COMMENT)
    // console.log(zID);
    // console.log(comment)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await addListingComment({
                variables: {
                    zillowID: zID,
                    comment: comment,
                    authorName: authorName,
                },
            });
            setComment('')

        } catch (error) {
           console.error('Error adding comment:', error) 
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                id="outlined-basic"
                label="Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required={true}
            />
            <Button
                variant="contained"
                fullWidth
                onClick={(e) => handleSubmit(e)}
            >
                Leave a comment!
            </Button>
        </FormGroup>
    )
}