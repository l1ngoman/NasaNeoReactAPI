import React, { Component } from 'react';
import { Col, Button } from 'react-bootstrap'

class Header extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <section className="headerNavBar">
        <a href="https://api.nasa.gov/api.html#NeoWS"><div className="image"></div></a>
        <h1 className="text-primary">Near Earth Objects</h1>
          <ul className="nav navbar-nav">
            <li className="searchBar"><Button onClick={this.props.toggleUOM}>Imperial <span className="sr-only">(current)</span></Button></li>
            <li className="searchBar"><Button onClick={this.props.toggleUOM}>Metric</Button></li>
            <li className="searchBar"><input className="searchBar2" type="date" onChange={this.props.changeData}/></li>
            <li className="searchBar">
              <form type="date" name="date" onSubmit={this.props.getData}>
                <input type="submit" className="searchBar searchBar2" value="GO"/>
              </form>
            </li>
          </ul>

      </section>
    )
  }
}

export default Header
