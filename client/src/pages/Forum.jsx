import { useQuery } from '@apollo/client';
import { QUERY_TOPICS} from '../utils/queries';
import { useState, useEffect } from 'react';

import { Container, Accordion, AccordionSummary, AccordionDetails, Button, Typography, Box } from "@mui/material";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import TopicList from '../components/TopicList';
import TopicForm from '../components/TopicForm';

const Forum = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { loading, data } = useQuery(QUERY_TOPICS);
    const topics = data?.getAllForumTopics || [];
    // console.log(topics);
    useEffect(() => {


        //
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;


            setIsVisible(scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);


    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth', // Smooth scrolling
        });
    };
    return (
        <Box m={2}>
            <Container>
                <Accordion>
                    <AccordionSummary>
                            <Button variant="contained" style={{marginLeft: "auto"}}>Click here to add new topic</Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TopicForm />
                    </AccordionDetails>
                </Accordion>

                
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : (
                        <TopicList
                            topics={topics}
                        />
                    )}
               
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

export default Forum;