import React, { Component } from 'react';
import './style.css'

class Card extends Component {

  state = {
    buyLink: '',
    title: '',
    img: '',
    authors: '',
    publisher: '',
    preview: '',
  }

  componentDidMount() {
    let { buyLink, title, img, authors, publisher, preview } = this.props;
    this.setState({
      buyLink, title, img, authors, publisher, preview
    });
  }
  render(){
    return (
      <div className="card book_container">
        <div className="card-body book_wrapper">
            <img className="card-img-top book_image" src={this.state.img} alt={this.state.title}/>
            <div className="book_details">
              <h5 className="card-title">{this.state.title}</h5>
              <p className="card-text"><b>By:</b> {this.state.authors ? this.state.authors : "Anon" }</p>
              <p className="card-text"><b>Publisher:</b> {this.state.publisher}</p>
              <a className="btn btn-primary buy-button" href={this.state.buyLink ? this.state.buyLink : this.state.preview} target="_blank" rel="noopener noreferrer">{this.state.buyLink ? "Purchase" : "Preview"}</a>
            </div>
        </div>
      </div>
    );
  }
}

export default Card;