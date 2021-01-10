import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        SavedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
      }
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($book: BookInput!) {
    SaveBook(book: $book) {
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    SaveBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;
