import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import neoData from '../sample-neo.json'
import Header from '../components/header.js'



class Main extends Component {
  constructor(props){
    super(props)
    let today = new Date()
    this.state = {
      startDate:`${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
      rawData: neoData,
      asteroids: [],
      api_key: "QwC8HaITYtiln0yN07HZgWMG1ShD6j2RwJZdp2SU",
      uom1: ['feet','meters'],
      uom2: ['miles','kilometers'],
      index: 0,
    }
  }

  componentDidMount(){
    this.newFetch(this.state.index)
  }

  render() {
    console.log(this.state.startDate);
    let { uom1, uom2, index } = this.state
    return (
      <main>
        <header className="headerNavbar">
          <Header changeDate={this.changeDate} getData={this.getData} toggleUOM={this.toggleUOM} />
        </header>
        <Table>
          <thead>
            <tr>
              <th className="text-primary">Name</th>
              <th className="text-warning">Est. Diameter</th>
              <th className="text-danger">Closest Approach</th>
              <th className="text-success">Distance</th>
              <th className="text-info">Velocity</th>
            </tr>
            <tr className="text-muted">
              <th id="subheader"></th>
              <th id="subheader" className="text-warning">({uom1[index]})</th>
              <th id="subheader"></th>
              <th id="subheader" className="text-success">({uom2[index]})</th>
              <th id="subheader" className="text-info">({uom2[index]}-per-hour)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.asteroids.map((asteroid)=>{
              return(
                <tr key={asteroid.id}>
                  <td className="text-primary">{asteroid.name}</td>
                  <td className="text-warning">{asteroid.diameterMin} - {asteroid.diameterMax}</td>
                  <td className="text-danger">{asteroid.date}</td>
                  <td className="text-success">{asteroid.distance}</td>
                  <td className="text-info">{asteroid.velocity}</td>
                </tr>
              )
            })}
          </tbody>
          </Table>
      </main>
    );
  }

  newFetch(newIndex){
    console.log('fetch request');
    let { uom1, uom2 } = this.state
    // Get hold of the part of the response we are interested in
    fetch("https://api.nasa.gov/neo/rest/v1/feed?"+`start_date=${this.state.startDate}&api_key=${this.state.api_key}`).then((rawResponse)=>{
      return rawResponse.json()
    }).then((parsedResponse) => {
    let neoData = parsedResponse.near_earth_objects
    // Instantiate a new array to hold our mapped data
    let newAsteroids = []
    Object.keys(neoData).forEach((date)=>{
      neoData[date].forEach((asteroid) =>{
        newAsteroids.push({
          id: asteroid.neo_reference_id,
          name: asteroid.name,
          date: asteroid.close_approach_data[0].close_approach_date,
          diameterMin: asteroid.estimated_diameter[uom1[newIndex]].estimated_diameter_min.toFixed(0),
          diameterMax: asteroid.estimated_diameter[uom1[newIndex]].estimated_diameter_max.toFixed(0),
          closestApproach: asteroid.close_approach_data[0].miss_distance[uom2[newIndex]],
          velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity[uom2[newIndex]+'_per_hour']).toFixed(0),
          distance: asteroid.close_approach_data[0].miss_distance[uom2[newIndex]],

        })
      })
    })
    let sortedAsteriods = newAsteroids.sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    }).reverse()
    this.setState({asteroids: sortedAsteriods,index: newIndex})
    })
  }

  getData = (e) => {
    e.preventDefault()
    this.newFetch(this.state.index)
  }

  changeDate = (e) => {
    this.setState({startDate: e.target.value})
  }

  toggleUOM = () => {
    let { index } = this.state
    if(index === 1){
    this.newFetch(0)
    }else{
      this.newFetch(1)
    }
  }
}

export default Main;
