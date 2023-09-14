import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {useState} from 'react';

import Auth from '../../utils/auth';

import { Card, CardContent, CardHeader, Stack, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

import { QUERY_SINGLE_TOPIC } from '../../utils/queries';
import { REMOVE_FORUM_COMMENT } from '../../utils/mutations';

const ForumCommentsList = ({ comments = [] }) => {
  if (!comments.length) {
    return <Typography variant="h4" gutterBottom>
      No comments yet!
    </Typography>;
  }

  const [commentId, setCommentId] = useState('');

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { topicId } = useParams();

  let username = "";

  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.name;
  } 

  const [removeForumComment, { error }] = useMutation(REMOVE_FORUM_COMMENT,
    {
      refetchQueries: [
        QUERY_SINGLE_TOPIC,
        'getOneForumTopic',
      ]
    });

  //function to remove comment
  const handleRemoveComment = async () => {
    try {
      const { data } = await removeForumComment({
        variables: { topicId, commentId },
      });
    } catch (err) {
      console.error(err);
      // alert("Not your comment!")
    }
    handleClose();
  };

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm you would like to delete comment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveComment} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
      <Typography variant="h4" gutterBottom>
        Comments:
      </Typography>

      <Stack spacing={3}>
        {comments &&
          comments.map((comment) => (
            <Card key={comment._id} variant="outlined">

              <CardHeader
                title={comment.commentAuthor}
                subheader={comment.createdAt}
              >
              </CardHeader>

              <CardContent>
                <Typography variant="paragraph">
                  {comment.commentText}
                </Typography>
              </CardContent>
              {username===comment.commentAuthor && (
                <Button variant="outlined" color="error" onClick={() => { setCommentId(comment._id); handleClickOpen() }} style={{ marginBottom: "2%", marginLeft: "2%" }}>
                REMOVE COMMENT
              </Button>
              )}
            </Card>
          ))}
      </Stack>

    </div>

    );

};

export default ForumCommentsList;
