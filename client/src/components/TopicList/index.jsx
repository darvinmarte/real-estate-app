import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { REMOVE_TOPIC } from '../../utils/mutations';
import { QUERY_TOPICS } from '../../utils/queries';

import Auth from '../../utils/auth';

import { Card, Button, CardContent, CardActions, CardHeader, Stack, Typography, Grid, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";

import { useState } from "react";

const TopicList = ({ topics }) => {
  if (!topics.length) {
    return <Typography variant="h4" gutterBottom>
      Nothing was published yet!
    </Typography>;
  }

  const [removeForumTopic, { error }] = useMutation(REMOVE_TOPIC,
    {
      refetchQueries: [
        QUERY_TOPICS,
        'getAllForumTopics',
      ]
    });

  let username = "";

  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.name;
  } 

  const [topicId, setTopicId] = useState('');

  //logic for CONFIRMATION modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //function to remove topic, opens error modal if user trying to remove topic that doesn't belong to them
  const handleRemoveTopic = async () => {
    try {
      const { data } = await removeForumTopic({
        variables: { topicId },
      });
    } catch (err) {
      console.error(err);
      // handleOpen();
    }
    handleClose();
  };

  //Pages
  const [page, setPage] = useState(1);

  // Calculate the start and end indexes for the current page
  const startIndex = (page - 1) * 6;
  const endIndex = startIndex + 6;

  const cardsToShow = topics.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
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
          {"Please confirm"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please confirm you would like to delete this topic.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveTopic} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="h4">
        Total {topics.length} topics currently in discussion.
      </Typography>

      <Container style={{ marginBottom: "4%" }}>
        {topics &&
          cardsToShow.map((topic) => (
            <Card key={topic._id} variant="outlined" style={{ backgroundColor: "#88989993", marginTop: "2rem" }}>

              <CardHeader
                title={topic.title}
                subheader={topic.author}
              >
              </CardHeader>

              <CardContent>


                <Typography variant="paragraph">
                  {topic.content}
                </Typography>

              </CardContent>

              <CardActions>
                <Grid container justifyContent="space-between">
                  <Typography color="text.secondary" gutterBottom>
                    Published on {topic.createdAt}
                  </Typography>

                  <Grid item sx={{ '& button': { m: 1 } }}>
                    {username === topic.author && (
                      <Button variant="outlined" color="error" onClick={() => { setTopicId(topic._id); handleClickOpen() }}>
                      REMOVE TOPIC
                    </Button> )}

                    <Button variant="outlined">
                      <Link
                        to={`/forum/${topic._id}`}
                        style={{ textDecoration: 'None', color: "black" }}
                      >
                        Join the discussion on this topic
                      </Link>
                    </Button>

                  </Grid>

                </Grid>

              </CardActions>
            </Card>
          ))}

        <Stack direction="row" spacing={2} style={{ marginTop: "2%" }}>
          <Button variant="contained" onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </Button>
          <Button variant="contained" onClick={handleNextPage} disabled={endIndex >= topics.length}>
            Next Page
          </Button>
        </Stack>

      </Container>
    </>

  );
};


export default TopicList;
