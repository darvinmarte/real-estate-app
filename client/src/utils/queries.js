import { gql } from '@apollo/client';

//here will be queries 
export const QUERY_LISTING_COMMENTS = gql`
query Query($zID: ID!) {
  listingComments(zID: $zID) {
    zID
    comment
    authorName
    dateCreated
  }
}`