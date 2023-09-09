import { useQuery } from '@apollo/client';
import { QUERY_TOPICS } from '../utils/queries';

import { Container, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";

import TopicList from '../components/TopicList';
import TopicForm from '../components/TopicForm';

const Forum = () => {
    const { loading, data } = useQuery(QUERY_TOPICS);
    const topics = data?.getAllForumTopics || [];
    console.log(topics);
    return (
        <main>
            <Container maxWidth="lg">
                <Accordion>
                    <AccordionSummary>
                        <Button variant="contained">Click here to add new topic</Button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <TopicForm />
                    </AccordionDetails>
                </Accordion>

                <div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <TopicList
                            topics={topics}
                        />
                    )}
                </div>
            </Container>
        </main>
    );
};

export default Forum;