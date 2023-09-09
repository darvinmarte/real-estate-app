import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_FORUM_COMMENT } from '../../utils/mutations';

import { Card, TextField, Button, CardContent, CardActions, Box, CardHeader, Stack } from "@mui/material";

import Auth from '../../utils/auth';

const ForumCommentsForm = ({ topicId }) => {
  const [commentText, setCommentText] = useState('');

  const [addForumComment, { error }] = useMutation(ADD_FORUM_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addForumComment({
        variables: {
          topicId,
          commentText,
          commentAuthor: Auth.getProfile().data.name,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText') {
      setCommentText(value);
    }
  };

  return (
    <div>

      {Auth.loggedIn() ? (
        <>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleFormSubmit}>

            <Card variant="outlined">
              <CardHeader
                title="Add your comment below:"
              />

              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="Your Comment"
                    variant="outlined"
                    name="commentText"
                    style={{ width: '75%' }}
                    value={commentText}
                    onChange={handleChange}
                  />
                </Stack>
              </CardContent>

              <CardActions>
                <Button variant="contained" type="submit">
                  Add comment
                </Button>
              </CardActions>

              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}

            </Card >
          </Box>
        </>
      ) : (
        <p>
          You need to be logged in to add comments. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ForumCommentsForm;
