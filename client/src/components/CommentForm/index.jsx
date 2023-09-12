import Auth from '../../utils/auth'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material'
import { ADD_LISTING_COMMENT } from '../../utils/mutations';


//need comment from user
//do mutation - mutation will expect userName, use utils auth.js getprofile().data.name
//send muation on a click


// eslint-disable-next-line react/prop-types
export default function CommentForm({ onSubmit }) {

    const { zID } = useParams();
    const [comment, setComment] = useState('');
    const authorName = Auth.getProfile().data.name;
    const [addComment] = useMutation(ADD_LISTING_COMMENT)

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await addComment({
                variables: {
                    authorName: authorName,
                    comment: comment,
                    zID: zID,
                },
            });
            console.log(addComment)
            onSubmit()
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
                required="true"
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
            >
                Leave a comment!
            </Button>
        </form>
    )
}