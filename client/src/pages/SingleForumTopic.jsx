import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ForumCommentsList from '../components/ForumCommentsList';
import ForumCommentsForm from '../components/ForumCommentsForm';

import { QUERY_SINGLE_TOPIC } from '../utils/queries';

const SingleForumTopic = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { topicId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TOPIC, {
        // pass URL parameter
        variables: { topicId: topicId },
    });

    const topic = data?.getOneForumTopic || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="my-3">
            <h3 className="card-header bg-dark text-light p-2 m-0">
                <span style={{ fontSize: '2rem' }}>
                    Title: {topic.title}
                </span>
                <br />
                <span style={{ fontSize: '1rem' }}>
                    Published by {topic.author}
                </span>
                <br />
                <span style={{ fontSize: '1rem' }}>
                    Published on {topic.createdAt}
                </span>
            </h3>
            <div className="bg-light py-4">
                <div
                    className="p-4"
                    style={{
                        fontSize: '1.5rem',
                        fontStyle: 'italic',
                        border: '2px dotted #1a1a1a',
                        lineHeight: '1.5',
                    }}
                >
                    {topic.content}
                </div>
            </div>

            <div className="my-5">
                <ForumCommentsList comments={topic.comments} />
            </div>
            <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <ForumCommentsForm topicId={topic._id} />
            </div>
        </div>
    );
};

export default SingleForumTopic;