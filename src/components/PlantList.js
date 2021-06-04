import React, { Component } from "react";
import axios from "axios";

export default class PlantList extends Component {
  // add state with a property called "plants" - initialize as an empty array
  state = {
    plants: [],
    searchValue: ''
  };

  // when the component mounts:
  //   - fetch data from the server endpoint - http://localhost:3333/plants
  //   - set the returned plants array to this.state.plants

  /*********  DON'T CHANGE ANYTHING IN THE RENDER FUNCTION *********/
  getPlants() {
    axios.get('http://localhost:3333/plants')
      .then(res => {
        console.log("axios call worked")
        console.log("Res of axios call", res);
        this.setState({
          ...this.state,
          plants: res.data,
          searchValue: ''
        })
      })
      .catch(err => {
        console.log("call failed:", err);
      });
  }
  
  componentDidMount() {
    this.getPlants();
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      searchValue: e.target.value
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("state inside handleSubmit", this.state.plants);
    console.log("value", this.state.searchValue);

    const filterItems = (query) => {
      return this.state.plants.filter(plant => plant.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
    }
    console.log("search result", filterItems(this.state.searchValue))

    this.setState({
      ...this.state,
      plants: filterItems(this.state.searchValue)
    })
  };

  clearSearch = () => {
    this.getPlants();
  }

  render() {
    return (
      <div>

        <form onSubmit={this.handleSubmit}>
          <input 
            name="search"
            placeholder="Search plants..."
            value={this.state.searchValue}
            onChange={this.handleChange}
          />
          <button>Search</button>
        </form>

        <button onClick={this.clearSearch}>Reset Search</button>
        
        <main className="plant-list">
          {this.state?.plants?.map((plant) => (
            <div className="plant-card" key={plant.id} data-testid="plant-card">
              <img className="plant-image" src={plant.img} alt={plant.name} />
              <div className="plant-details">
                <h2 className="plant-name">{plant.name}</h2>
                <p className="plant-scientific-name">{plant.scientificName}</p>
                <p>{plant.description}</p>
                <div className="plant-bottom-row">
                  <p>${plant.price}</p>
                  <p>☀️ {plant.light}</p>
                  <p>💦 {plant.watering}x/month</p>
                </div>
                <button
                  className="plant-button"
                  onClick={() => this.props.addToCart(plant)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }
}
