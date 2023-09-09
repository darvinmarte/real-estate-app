// import { Link } from 'react-router-dom';

const TopicList = ({ topics }) => {
  if (!topics.length) {
    return <h3>No topics Were published yet!</h3>;
  }

  return (
    <div>
        <h3>Here are latest topics:</h3>
        {topics.map((topic) => (
          <div key={topic._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
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
            </h4>

            <div className="card-body bg-light p-2">
              <p>{topic.content}</p>
            </div>
            {/* <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/forum/${topic._id}`}
            >
              Join the discussion on this topic.
            </Link> */}
          </div>
        ))  }  
    </div>
  );
};

export default TopicList;
