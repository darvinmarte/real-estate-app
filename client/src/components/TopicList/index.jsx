import { Link } from 'react-router-dom';

import { Card, Button, CardContent, CardActions, Box, CardHeader, Stack, Typography } from "@mui/material";

const TopicList = ({ topics }) => {
  if (!topics.length) {
    return <Typography variant="h4" gutterBottom>
      Nothing was published yet!
    </Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Here are latest topics:
      </Typography>

      <Stack spacing={3}>
        {topics.map((topic) => (
          <Card key={topic._id} variant="outlined">

            <CardHeader
              title={topic.title}
              subheader={topic.createdAt}
            >
            </CardHeader>

            <CardContent>

              <Typography variant="paragraph">
                {topic.content}
              </Typography>

              <Typography color="text.secondary" gutterBottom>
                Published by {topic.author}
              </Typography>

            </CardContent>

            <CardActions>
              <Button variant="outlined">
                <Link
                  to={`/forum/${topic._id}`}
                  style={{ textDecoration: 'None', color: "black" }}
                >
                  Join the discussion on this topic.
                </Link>
              </Button>

            </CardActions>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default TopicList;
