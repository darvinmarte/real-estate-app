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
    _id
    zillowID
    comments {
     comment
     authorName
     dateCreated
   }
  }
}`;
