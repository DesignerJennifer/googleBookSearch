import React, { useEffect, useState } from "react";
import Jumbotron from "../Jumbotron";
import DeleteBtn from "../DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, TextArea, FormBtn } from "../Form";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({
    title: "",
    author: "",
    synopsis: ""
  })

  // Load all books and store them with setBooks
  useEffect(() => {
    loadBooks()
  }, [])

  // Loads all books and sets them to books
  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(() => setFormObject({
          title: "",
          author: "",
          synopsis: ""
        }))
        .then(() => loadBooks())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <div>
        <Jumbotron>
          <h1>(React) Google Books Search</h1>
        </Jumbotron>
        <form>
          <Input
            onChange={handleInputChange}
            name="title"
            placeholder="Title (required)"
            value={formObject.title}
          />
          <Input
            onChange={handleInputChange}
            name="author"
            placeholder="Author (required)"
            value={formObject.author}
          />
          <TextArea
            onChange={handleInputChange}
            name="synopsis"
            placeholder="Synopsis (Optional)"
            value={formObject.synopsis}
          />
          <FormBtn
            disabled={!(formObject.author && formObject.title)}
            onClick={handleFormSubmit}
          >
            Submit Book
              </FormBtn>
        </form>
      </div>
      <div>
        <Jumbotron>
          <h1>Books On My List</h1>
        </Jumbotron>
        {books.length ? (
          <List>
            {books.map(book => {
              return (
                <ListItem key={book._id}>
                  <a href={"/books/" + book._id}>
                    <strong>
                      {book.title} by {book.author}
                    </strong>
                  </a>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                </ListItem>
              );
            })}
          </List>
        ) : (
            <h3>No Results to Display</h3>
          )}
      </div>
    </Container>
  );
}


export default Search;
