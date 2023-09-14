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
query listingComments($zillowId: String!) {
  listingComments(zillowId: $zillowId) {
    
    zillowID
    comments {
      _id
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($amount: Int) {
    checkout(amount: $amount) {
      session
    }
  }
`;