import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ForumCommentsList from '../components/ForumCommentsList';
import ForumCommentsForm from '../components/ForumCommentsForm';

import { Container, Card, CardHeader, CardContent, Typography, Stack } from "@mui/material";

import { QUERY_SINGLE_TOPIC } from '../utils/queries';

const SingleForumTopic = () => {
    const { topicId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TOPIC, {
        variables: { topicId: topicId },
    });

    const topic = data?.getOneForumTopic || {};

    if (loading) {
        return <Typography variant="paragraph">
            Loading...
        </Typography>
    }
    
    return (
        <main>
            <Container maxWidth="lg">
                <Stack spacing={3}>
                    <Card variant="outlined">

                        <CardHeader
                            title={topic.title}
                            subheader={topic.createdAt}
                        />

                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                Published by {topic.author}
                            </Typography>

                            <Typography variant="paragraph" gutterBottom>
                                {topic.content}
                            </Typography>

                        </CardContent>

                    </Card>

                    <ForumCommentsList comments={topic.comments} />

                    <ForumCommentsForm topicId={topic._id} />
                </Stack>

            </Container>
        </main>
    );
};

export default SingleForumTopic;