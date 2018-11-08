import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import neoData from '../sample-neo.json'



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
    this.newFetch()
  }

  render() {
    console.log(this.state.startDate);
    let { uom1, uom2, index } = this.state
    return (
      <main>
        <header>
          <div className="image"></div>
          <h1 className="text-muted">Near Earth Objects</h1>
        </header>
        <Table>
          <thead>
            <tr>
              <th className="text-primary">Name</th>
              <th className="text-warning">Estimated Diameter</th>
              <th className="text-danger">Date of Closest Approach</th>
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
          <div id="formDiv">
            <form onSubmit={this.getData}>
              <input type="date" name="date" onChange={this.changeDate}/>
              <input type="submit" />
            </form>
          </div>
          <div id="buttons">
            <button className="btn btn-warning" id="button" onClick={this.toggleUOM}>Imperial</button>
            <button className="btn btn-warning" id="button" onClick={this.toggleUOM}>Metric</button>
          </div>
      </main>
    );
  }

  changeDate = (e) => {
    console.log('changing date');
    console.log(e.target.value);
    this.setState({startDate: e.target.value})
  }

  newFetch(){
    console.log('fetch request');
    // console.log(newDate);
    let { uom1, uom2, index } = this.state
    let a = uom1[index]
    let b = uom2[index]
    console.log(a);
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
          diameterMin: asteroid.estimated_diameter[a].estimated_diameter_min.toFixed(0),
          diameterMax: asteroid.estimated_diameter[a].estimated_diameter_max.toFixed(0),
          closestApproach: asteroid.close_approach_data[0].miss_distance[b],
          velocity: parseFloat(asteroid.close_approach_data[0].relative_velocity[b+'_per_hour']).toFixed(0),
          distance: asteroid.close_approach_data[0].miss_distance[b],

        })
      })
    })
    this.setState({asteroids: newAsteroids,index: index})
    })
  }

  getData = (e) => {
    e.preventDefault()
    console.log(e);
    this.newFetch()
  }

  toggleUOM = () => {
    let { index } = this.state
    if(index === 1){
    this.setState({index: 0})
    }else{
      this.setState({index: 1})
    }
  }

}

export default Main;
