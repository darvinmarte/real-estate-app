import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { REMOVE_TOPIC } from '../../utils/mutations';
import { QUERY_TOPICS } from '../../utils/queries';

import { Card, Button, CardContent, CardActions, Box, CardHeader, Stack, Typography, Grid, Container, Modal } from "@mui/material";

import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxwidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

  //function to remove topic, opens error modal if user trying to remove topic that doesn't belong to them
  const handleRemoveTopic = async (topicId) => {
    try {
      const { data } = await removeForumTopic({
        variables: { topicId },
      });
    } catch (err) {
      console.error(err);
      handleOpen();
    }
  };

  //logic for ERROR modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

      <Typography variant="h4">
        Total {topics.length} topics currently in discussion.
      </Typography>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="body1" component="h4">
            Oh no!
          </Typography>
          <Typography variant="body2" id="modal-modal-description" sx={{ mt: 2 }}>
            You cannot remove the topic you didn't post.
          </Typography>
        </Box>
      </Modal>

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

                    <Button variant="outlined" color="error" onClick={() => handleRemoveTopic(topic._id)}>
                      REMOVE TOPIC
                    </Button>

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
