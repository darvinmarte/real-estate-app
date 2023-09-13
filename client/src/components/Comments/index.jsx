import Auth from '../../utils/auth'
import { useState } from 'react';
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { ADD_LISTING_COMMENT } from '../../utils/mutations';
//form listing
import { QUERY_LISTING_COMMENTS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { TextField, Button, FormGroup, Container, Typography, Stack, Card, CardHeader, CardContent, Box } from '@mui/material';
import CommentList from '../CommentList';

export default function Comments() {


    const { zID } = useParams();

    const [newComment, setNewComment] = useState('');
    // const authorName = Auth.getProfile().data.name;
    const { data, loading } = useQuery
        (QUERY_LISTING_COMMENTS, { variables: { zillowId: zID } })

    const [addListingComment, { error }] = useMutation(ADD_LISTING_COMMENT,{
        refetchQueries: [
            QUERY_LISTING_COMMENTS,
            'listingComments',
        ]
    })


    const commentData = data?.listingComments || [];
    console.log(commentData);
    if (loading) return <div>loading...</div>

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await addListingComment({
                variables: {
                    zillowId: zID,
                    comment: newComment,
                    authorName: authorName,
                },
            });
            console.log(data);
            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    return (

        <>

            
        <CommentList data={commentData} >
        </CommentList>

            {Auth.loggedIn() ? (
            <Box style={{margin:'20px 0'}}>

                <FormGroup onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        label="Comment"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
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
                </Box> ) : (
                <p>
                    You need to be logged in to add comments. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </>

    )

}