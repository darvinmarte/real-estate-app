import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Card, TextField, Button, CardContent, CardActions, Box, CardHeader, Stack } from "@mui/material";

import { ADD_TOPIC } from '../../utils/mutations';
import { QUERY_TOPICS } from '../../utils/queries';

import Auth from '../../utils/auth';

const TopicForm = () => {
  const [topicContent, setTopicContent] = useState('');
  const [topicTitle, setTopicTitle] = useState('');

  const [addForumTopic, { error }] = useMutation(ADD_TOPIC,
    {
      refetchQueries: [
        QUERY_TOPICS,
        'getAllForumTopics',
      ]
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(topicTitle);
    console.log(topicContent);
    try {
      const { data } = await addForumTopic({
        variables: {
          title: topicTitle,
          content: topicContent,
          author: Auth.getProfile().data.name,
        },
      });

      setTopicContent('');
      setTopicTitle('');

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'topicContent') {
      setTopicContent(value);
    } else if (name === 'topicTitle') {
      setTopicTitle(value);
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
              title="Fill in below fields to start new conversation:"
              />

              <CardContent>
                <Stack spacing={2}>
                <TextField
                  label="New Topic Title"
                  variant="outlined"
                  name="topicTitle"
                  style={{ width: '75%' }}
                  value={topicTitle}
                  onChange={handleChange}
                />

                <TextField
                  label="New Topic Content"
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={4}
                  variant="outlined"
                  name="topicContent"
                  style={{ width: '75%' }}
                  value={topicContent}
                  onChange={handleChange}
                />
                </Stack>
              </CardContent>

              <CardActions>
                <Button variant="contained" type="submit">
                  Publish New Topic
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
          You need to be logged in to post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TopicForm;
