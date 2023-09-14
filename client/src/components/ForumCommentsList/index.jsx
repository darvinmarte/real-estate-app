import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Card, CardContent, CardHeader, Stack, Typography, Button } from "@mui/material";

import { QUERY_SINGLE_TOPIC } from '../../utils/queries';
import { REMOVE_FORUM_COMMENT } from '../../utils/mutations';

const ForumCommentsList = ({ comments = [] }) => {
  if (!comments.length) {
    return <Typography variant="h4" gutterBottom>
      No comments yet!
    </Typography>;
  }

  const { topicId } = useParams();

  const [removeForumComment, { error }] = useMutation(REMOVE_FORUM_COMMENT,
    {
      refetchQueries: [
        QUERY_SINGLE_TOPIC,
        'getOneForumTopic',
      ]
    });

  //function to remove comment
  const handleRemoveComment = async (commentId) => {
    try {
      const { data } = await removeForumComment({
        variables: { topicId, commentId },
      });
    } catch (err) {
      console.error(err);
      // alert("Not your comment!")
      // handleOpen();
    }
  };

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
              <Button variant="outlined" color="error" onClick={() => handleRemoveComment(comment._id)} style={{ marginBottom: "2%", marginLeft: "2%" }}>
                REMOVE COMMENT
              </Button>
            </Card>
          ))}
      </Stack>

    </div>

    );

};

export default ForumCommentsList;
