import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ForumCommentsList from '../components/ForumCommentsList';
import ForumCommentsForm from '../components/ForumCommentsForm';

import { Container, Card, CardHeader, CardContent, Typography, Stack, Button, Box } from "@mui/material";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { QUERY_SINGLE_TOPIC } from '../utils/queries';

const SingleForumTopic = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { topicId } = useParams();
    useEffect(() => {
    

        //
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;


            setIsVisible(scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);

       
    }, []);
    const navigate = useNavigate();

    // function to navigate back to the previous page
    const handleGoBack = () => {
        navigate(-1);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling
        });
    };

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
        <Box m={2}>
            

            <Container maxWidth="lg">
                <Button variant="outlined" onClick={handleGoBack} style={{marginBottom: "2%"}}>
                    GO BACK
                </Button>
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
            <Fab onClick={scrollToTop} style={{
                display: isVisible ? 'block' : 'none', // Show the button when isVisible is true
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                backgroundColor: 'transparent', // Make it transparent
            }} variant="extended">
                <NavigationIcon />
            </Fab>
        </Box>
    );
};

export default SingleForumTopic;