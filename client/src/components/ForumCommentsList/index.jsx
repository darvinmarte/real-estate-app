import { Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";

const ForumCommentsList = ({ comments = [] }) => {
  if (!comments.length) {
    return <Typography variant="h4" gutterBottom>
      No comments yet!
    </Typography>;
  }

  return (
    <div>
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
            </Card>
          ))}
      </Stack>

    </div>

    );

};

export default ForumCommentsList;
