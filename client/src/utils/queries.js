import { gql } from '@apollo/client';

//here will be queries 
<<<<<<< HEAD
export const QUERY_TOPICS = gql`
  query getAllForumTopics {
    getAllForumTopics {
      _id
      title
      content
      author
      createdAt
    }
  }
`;
=======
export const QUERY_LISTING_COMMENTS = gql`
query Query($zID: ID!) {
  listingComments(zID: $zID) {
    zID
    comment
    authorName
    dateCreated
  }
}`
>>>>>>> 08355ada95c50766c224b6994e22263418c44f54
