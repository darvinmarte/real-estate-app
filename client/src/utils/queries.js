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

export const QUERY_SINGLE_TOPIC = gql`
  query getOneForumTopic($topicId: ID!) {
    getOneForumTopic(topicId: $topicId) {
      _id
      title
      content
      author
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;


export const QUERY_LISTING_COMMENTS = gql`
query listingComments($zillowID: String!) {
  listingComments(zillowID: $zillowID) {
    zillowID
    comments {
     comment
     authorName
     dateCreated
   }
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