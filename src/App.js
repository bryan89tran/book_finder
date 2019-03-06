import React, { Component } from 'react';
import Cards from './Components/Cards'
import './App.css';

class App extends Component {
  
  state = {
    search: '',
    books: [],
  }

  handleChange = event => {
    let { value, name } = event.target;
    this.setState({
      [name]: value
    });
  }

  onKeyPressed = event => {
    console.log(this.state.search)
    if(event.keyCode === 13) {
      this.searchGoogle();
    }
  }

  searchGoogle() {
    let term = encodeURI(this.state.search);
    if(term.length > 2){
      this.setState({ books: []});
      fetch('https://www.googleapis.com/books/v1/volumes?q='+ term)
        .then(resp => {  return resp.json(); })
        .then(json => {
          this.setState({
            books: json.items
          });
        });
    }
  }

  render() {
    return (
      <div>
        <div className="search-bar_container">
          <input 
            className="search-bar"
            placeholder="Search"
            value={this.state.search}
            name="search"
            onChange={this.handleChange}
            type="text"
            onKeyUp={this.onKeyPressed}
            tabIndex="0"
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
