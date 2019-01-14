import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap'

class Header extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section className="headerNavBar">
        <center>
          <a href="https://api.nasa.gov/api.html#NeoWS"><div className="image"></div></a>
          <h1 className="text-primary">Near Earth Objects</h1>
        </center>
          <ul className="nav navbar-nav">
            <li className="searchBar">
              <Button className="uomButton" onClick={this.props.toggleUOM}>Imperial <span className="sr-only">(current)</span></Button>
              <Button className="uomButton" onClick={this.props.toggleUOM}>Metric</Button>
            </li>
            <li>
              <form className="date" type="date" name="date" onSubmit={this.props.getData}>
                <input className="searchBar2" type="date" onChange={this.props.changeDate}/> 
                <input className="submit" type="submit" value="GO"/>
              </form>
            </li>
          </ul>
      </section>
    )
  }
}

export default Header
