import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType = (info) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: info
      }
    })
  }

  handleFetch = () => {
    let location = '/api/pets'
    if (this.state.filters.type !== 'all'){
      location += `?type=${this.state.filters.type}`
    }

    fetch(location)
    .then(r => r.json())
    .then( myPets => {
      this.setState({
        pets: myPets
      })
    })
  }
  
  onAdoptPet = (id) => {
    let petArrayCopy = [...this.state.pets]
    let petObject = petArrayCopy.find(pet => pet.id === id)
    petObject.isAdopted = true
    this.setState({
      pets: petArrayCopy
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.handleChangeType} onFindPetsClick={this.handleFetch}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets = {this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
