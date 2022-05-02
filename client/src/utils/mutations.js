import { gql } from '@apollo/client';

export const USER_LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password ) {
        token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
        bookId
        authors
        description
        title
        image
        link
            

        }
      }
    }
}`;


export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookData!) {
   saveBook saveBook(bookData:$bookData) { s
       user {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
                }
     
       }
   }
}`;


export const REMOVE_BOOK = gql`
mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
        token
        user {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
            }
        }
    }
} `;
