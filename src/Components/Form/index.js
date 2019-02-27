import React, { Component } from 'react';
import './style.css'

class Search extends Component {

  state = {
    search: "",
  }

  handleChange = event => {
    let { value, name } = event.target;
    this.setState({
      [name]: value
    });
    this.props.formChange(name, value);
  }

  render(){
    return (
      <input 
        className="search-bar"
        placeholder="Book"
        value={this.state.search}
        name="search"
        onChange={this.handleChange}
        type="text"
      />
    );
  }
}

export default Search;