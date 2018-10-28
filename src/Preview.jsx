import React from 'react';
import Lodash from 'lodash';
import {connect} from 'react-redux';

import { Grid , Row , Col , Panel , Button, Navbar ,Table } from 'react-bootstrap';

import './srd.css';

class Preview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};
	
		// This binding is necessary to make `this` work in the callback
		//this.handleClick = this.handleClick.bind(this);
	  }
	
	 
    
      Back = () => {
		// your code here
		this.props.history.push('/')
	  }    

	
	render() {
    let { results} = this.props ;
    console.log('elment 0' + typeof(results[0]))
   
    const listItems = results.map((number,index) =>
    
      
    <tr key={index}>
    <td>{index}</td>
    <td>{number}</td>
    <td>{number}</td>
  </tr>
    );
		return (
			<div className="container">

<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Preview</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
   
    <Navbar.Text pullRight>  <Button bsStyle="info" onClick={this.Back}> Back  </Button></Navbar.Text>
  </Navbar.Collapse>
</Navbar>


<Table striped bordered condensed hover>
  <thead>
    <tr>
      <th>#</th>
      <th>Gender </th>
      <th> Age_at_Commencement</th>
     
    </tr>
  </thead>
  <tbody>
   { listItems}
   
  </tbody>
</Table>

			</div>
		);
	}
}



const mapStateToProps = (state) => {
  return {
      results: state.results
  }
}
export default connect(mapStateToProps)(Preview);
