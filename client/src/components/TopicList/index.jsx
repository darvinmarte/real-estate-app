import { Link } from 'react-router-dom';

import { Card, Button, CardContent, CardActions, Box, CardHeader, Stack, Typography, Grid, Container } from "@mui/material";

import { useState } from "react";

const TopicList = ({ topics }) => {
  if (!topics.length) {
    return <Typography variant="h4" gutterBottom>
      Nothing was published yet!
    </Typography>;
  }

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

     
      <Container style={{marginBottom: "4%"}}>
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

                <Button variant="outlined">
                  <Link
                    to={`/forum/${topic._id}`}
                    style={{ textDecoration: 'None', color: "black" }}
                  >
                    Join the discussion on this topic
                  </Link>
                </Button>
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
