import React from 'react';
<<<<<<< HEAD
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
=======
>>>>>>> 87fdf1c1dfb15a23ddc55c691730352dbe7e9976
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  const { loading, data } = useQuery(GET_ME);

  const userData = data?.me || {};

  const [deleteBook] = useMutation(REMOVE_BOOK)

  // use this to determine if `useEffect()` hook needs to run again
  const handleDeleteBook = async (bookId) => {
    const token = Auth.login() ? Auth.getToken(): null;

    if (!token) {
      return false;
    }
    try {
      await deleteBook({
        variables: { bookId: bookId }
      });
      removeBookId(bookId);
    }catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <h2>Almost There...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
