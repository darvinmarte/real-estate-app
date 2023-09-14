import { gql } from "@apollo/client";

// mutations will be here

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_TOPIC = gql`
  mutation addForumTopic($title: String!, $content: String!) {
    addForumTopic(title: $title, content: $content) {
      _id
      title
      content
      author
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const REMOVE_TOPIC = gql`
  mutation removeForumTopic($topicId: ID!) {
    removeForumTopic(topicId: $topicId) {
      _id
    }
  }
`;

export const ADD_FORUM_COMMENT = gql`
  mutation addForumComment($topicId: ID!, $commentText: String!) {
    addForumComment(topicId: $topicId, commentText: $commentText) {
      _id
      title
      content
      author
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;

export const REMOVE_FORUM_COMMENT = gql`
  mutation removeForumComment($topicId: ID!, $commentId: ID!) {
    removeForumComment(topicId: $topicId, commentId: $commentId) {
      _id
    }
  }
`;

export const ADD_LISTING_COMMENT = gql`
mutation addListingComment($zillowId: String!, $comment: String!, $authorName: String!) {
  addListingComment(zillowID: $zillowId, comment: $comment, authorName: $authorName) {
    _id
    zillowID
    comments {
      comment
      authorName
      dateCreated
    }
  }
}`;