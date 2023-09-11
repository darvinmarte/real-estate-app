import { gql } from '@apollo/client';

//here will be queries 
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
export const QUERY_LISTING_COMMENTS = gql`
query Query($zID: ID!) {
  listingComments(zID: $zID) {
    zID
    comment
    authorName
    dateCreated
  }
}`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      email
      about
      posts {
        _id
        title
        content
        author
        createdAt
      }
    }
  }
`;