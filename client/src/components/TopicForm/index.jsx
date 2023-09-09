import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TOPIC } from '../../utils/mutations';
import { QUERY_TOPICS } from '../../utils/queries';

import Auth from '../../utils/auth';

const TopicForm = () => {
  const [topicContent, setTopicContent] = useState('');
  const [topicTitle, setTopicTitle] = useState('');

  const [addForumTopic, { error }] = useMutation (ADD_TOPIC, 
    {
      refetchQueries: [
        QUERY_TOPICS,
        'getAllForumTopics',
      ]
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(topicTitle);
    console.log(topicContent);
    try {
      const { data } = await addForumTopic({
        variables: {
          title: topicTitle,
          content: topicContent, 
          author: Auth.getProfile().data.name,
        },
      });

      setTopicContent('');
      setTopicTitle('');

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
   
    if (name === 'topicContent') {
      setTopicContent(value);
    } else if (name === 'topicTitle') {
      setTopicTitle(value);
    } 
  };

  return (
    <div>
      <h3>Write your topic here:</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="topicTitle"
                placeholder="New topic title..."
                value={topicTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>

              <textarea
                name="topicContent"
                placeholder="New topic content..."
                value={topicContent}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Publish New Topic
              </button>
            </div>

            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}

          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TopicForm;
