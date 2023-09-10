import { useQuery } from '@apollo/client';
import { QUERY_TOPICS } from '../utils/queries';

import { Container, Accordion, AccordionSummary, AccordionDetails, Button, Grid, Box } from "@mui/material";

import TopicList from '../components/TopicList';
import TopicForm from '../components/TopicForm';

const Forum = () => {
    const { loading, data } = useQuery(QUERY_TOPICS);
    const topics = data?.getAllForumTopics || [];
    // console.log(topics);
    return (
        <main>
            <Container>
                <Accordion>
                    <AccordionSummary>
                        {/* <Grid container justifyContent="flex-end"> */}
                            <Button variant="contained" style={{marginLeft: "auto"}}>Click here to add new topic</Button>
                        {/* </Grid> */}
                    </AccordionSummary>
                    <AccordionDetails>
                        <TopicForm />
                    </AccordionDetails>
                </Accordion>

                
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <TopicList
                            topics={topics}
                        />
                    )}
               
            </Container>
        </main>
    );
};

export default Forum;