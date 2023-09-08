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
    }
  }
`;

export const SIGN_OUT_MUTATION = gql`
mutation {
  signOut {
    success
    message
  }
}
`;