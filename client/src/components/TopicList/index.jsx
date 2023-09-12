import { Link } from 'react-router-dom';

import { Card, Button, CardContent, CardActions, Box, CardHeader, Stack, Typography, Grid, Container } from "@mui/material";

const TopicList = ({ topics }) => {
  if (!topics.length) {
    return <Typography variant="h4" gutterBottom>
      Nothing was published yet!
    </Typography>;
  }

  return (
    <>

      <Typography variant="h4">
        Here are the latest topics:
      </Typography>


      {topics &&
        topics.map((topic) => (
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
    </>

  );
};

export default TopicList;
