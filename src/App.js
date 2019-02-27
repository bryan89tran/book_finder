import React, { Component } from 'react';
import Form from './Components/Form'
import Cards from './Components/Cards'
import './App.css';

class App extends Component {
  
  state = {
    search: '',
    books: [],
  }

  handleInputChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  searchGoogle() {
    let term = encodeURI(this.state.search);
    fetch('https://www.googleapis.com/books/v1/volumes?q='+ term)
      .then(resp => {  return resp.json(); })
      .then(json => {
        this.setState({
          books: json.items
        });
      });
  }

  render() {
    return (
      <div>
        <div className="search-bar_container">
          <Form 
            formChange={(key, value) => this.handleInputChange(key, value)}
          />
          <img 
            src="./images/search.png" 
            alt="Magnifying Glass" 
            className="button"
            onClick={() => this.searchGoogle()}
           />
        </div>
        <div className="search-result_container">
          { (this.state.books) ?
            this.state.books.map((book, i) => {
            return (
              <Cards
                key={i}
                title={book.volumeInfo.title}
                authors={book.volumeInfo.authors}
                publisher={book.volumeInfo.publisher}
                img={book.volumeInfo.imageLinks.smallThumbnail ? book.volumeInfo.imageLinks.smallThumbnail : "./images/PlaceholderBook.png"}
                buyLink={book.saleInfo.buyLink}
                preview={book.volumeInfo.previewLink}
              />
            )
          }) : "Sorry Something is Wrong"}
        </div>
      </div>
    );
  }
}

export default App;
