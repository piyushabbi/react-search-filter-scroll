import React, { Component } from 'react';
import axios from 'axios';

import Card from '../Card/card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchText: ""
    };
  }
  inputChangeHandler = e => {
    this.setState({ searchText: e.target.value });
    axios.get("http://localhost:4000/data")
      .then(res => {
        let data = res.data.filter(f => {
          return f.title.indexOf(this.state.searchText) > -1;
        });
        this.setState({ data });
      });
  }
  
  render() {
    return (
      <div className="container">
        <h1>Products</h1>
        {/* Start: Input Search Component */}
        <input
          type="search"
          value={this.state.searchText}
          onChange={this.inputChangeHandler}
          placeholder="Search for products"
        />
        {/* End: Input Search Component */}
        <div className="row">
          <div className="col s12">
            {/* Start: Search Results */}
            {
              this.state.searchText === ""
              ? <i>Enter search text.</i>
              : this.state.data.length > 0
                ? this.state.data.map(m => <Card key={m["s.no"]} data={m} /> )
                : <i>No Match Found!</i>
            }
            {/* End: Search Results */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;