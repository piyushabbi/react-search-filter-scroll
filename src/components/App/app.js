import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Card from '../Card/card';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchText: "",
      sortByValue: "endDate"
    };
  }

  requestHandler = () => {
    axios.get("http://localhost:4000/data").then(res => {
      let data = res.data.filter(f => {
        return f.title
            .toLowerCase()
            .indexOf(this.state.searchText.toLowerCase()) > -1;
      });
      this.setState({ data });
    });
  }
  
  inputChangeHandler = e => {
    this.setState({ searchText: e.target.value });
    
    let debounced = _.debounce(this.requestHandler, 250, { maxWait: 1000 });
    //this.requestHandler();
    debounced()
  }
  sortHandler = (value) => {
    switch (value) {
      case 'title': {
        const data = this.state.data;
        let sortedData = data.sort((a, b) => a.title > b.title);
        this.setState(prevState => {
          return [...prevState.data, ...sortedData];
        });
        break;
      }
      default: break;
    }
  }
  selectChangeHandler = (e) => {
    this.setState({
      sortByValue: e.target.value
    }, () => {
      this.sortHandler(this.state.sortByValue);
    });
  }
  
  render() {
    return <div className="container">
        <h1>Products</h1>
        <div className="row">
          <div className="col s8">
            {/* Start: Input Search Component */}
            <input type="search" value={this.state.searchText} onChange={this.inputChangeHandler} placeholder="Search for products" />
            {/* End: Input Search Component */}
          </div>
          <div className="col s4">
            <label>Sort By:-</label>
            <select style={{display: 'block'}} value={this.state.sortByValue} onChange={this.selectChangeHandler}>
              <option value="title">Title</option>
              <option value="percentageFunded">Percentage Funded</option>
              <option value="endDate">End Date</option>
            </select>
          </div>
        </div>
        <div className="row">
          {/* Start: Search Results */}
          {
            this.state.searchText === "" 
            ? <p className="">Enter search text.</p>
            : this.state.data.length > 0 
              ? this.state.data.map(m => (
                  <Card key={m["s.no"]} data={m} />
                )) 
              : <p className="">No Match Found!</p>
          }
          {/* End: Search Results */}
        </div>
      </div>;
  }
}

export default App;