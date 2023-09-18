import Auth from '../../utils/auth'
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom';

import { ADD_LISTING_COMMENT, REMOVE_COMMENT } from '../../utils/mutations';
import { QUERY_LISTING_COMMENTS } from "../../utils/queries";

import { TextField, Button, FormGroup, Container, Typography, Stack, Card, CardHeader, CardContent, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Comments() {


    const { zID } = useParams();
    const [newComment, setNewComment] = useState('');
    const [commentId, setCommentId] = useState('');
    const [open, setOpen] = useState(false);
    //who is logged in
    let username;
    if (Auth.loggedIn()) {
        username = Auth.getProfile().data.name;

    }
    //the data query
    const { data, loading } = useQuery
        (QUERY_LISTING_COMMENTS, { variables: { zillowId: zID } })

    const commentData = data?.listingComments || [];
    //add comment mutation
    const [addListingComment, { error }] = useMutation(ADD_LISTING_COMMENT, {
        refetchQueries: [
            QUERY_LISTING_COMMENTS,
            'listingComments',
        ]
    })
    //remove comment mutation
    const [removeComment, { err }] = useMutation(REMOVE_COMMENT, {
        refetchQueries: [
            QUERY_LISTING_COMMENTS,
            'listingComments',
        ]
    });


    if (loading) return <div>loading...</div>
//handle adding a comment
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await addListingComment({
                variables: {
                    zillowId: zID,
                    comment: newComment,
                    authorName: username,
                },
            });

            setNewComment('');
        } catch (error) {
            console.error('Error adding comment:', error)
        }
    }

    //for dialog
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //delete comment
    const handleRemoveComment = async () => {
        try {
            const { deleteData } = await removeComment({
                variables: { commentId, zillowId: zID },
            });

        } catch (err) {
            console.error(err);
        }
        handleClose();
    };
    return (

        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please confirm you would like to delete this comment.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleRemoveComment} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>


            {(commentData.comments == []) || (commentData.comments == undefined) ?   <Typography variant="h6" gutterBottom>
                Be the first to write something about this property!
            </Typography>
                : <Typography variant="h6">Comments:  </Typography>
            }

          
            <Stack spacing={3}>
                {commentData.comments &&
                    commentData.comments.map(({ comment, authorName, dateCreated, _id }) => (
                        <Card key={_id} variant="outlined">
                            <Stack direction="row" display="flex" justifyContent="space-between">

                                <CardHeader
                                    title={`Posted by: ${authorName}`}
                                    subheader={dateCreated}
                                >
                                </CardHeader>
                                {username === authorName && (
                                    <Button onClick={() => {
                                        setCommentId(_id);
                                        handleClickOpen();
                                    }} startIcon={<DeleteIcon />} color="error">
                                    </Button>
                                )}
                            </Stack>

                            <CardContent>
                                <Typography variant="paragraph">
                                    {comment}
                                </Typography>

                            </CardContent>
                        </Card>
                    ))}
            </Stack>

            {Auth.loggedIn() ? (
                <Box style={{ margin: '20px 0' }}>

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
                </Box>) : (
                <p>
                    You need to be logged in to add comments. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </>

    )

}