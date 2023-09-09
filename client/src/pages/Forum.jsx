import { useQuery } from '@apollo/client';
import { QUERY_TOPICS } from '../utils/queries';

import TopicList from '../components/TopicList';
import TopicForm from '../components/TopicForm';

const Forum = () => {
    const { loading, data } = useQuery(QUERY_TOPICS);
    const topics = data?.getAllForumTopics || [];
   console.log(topics);
    return (
        <main>
            <div className="flex-row justify-center">
                <div
                    className="col-12 col-md-10 mb-3 p-3"
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <TopicForm />
                </div>
                <div className="col-12 col-md-8 mb-3">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <TopicList
                            topics={topics}
                        />
                    )}
                </div>
            </div>
        </main>
    );
};



export default Forum;