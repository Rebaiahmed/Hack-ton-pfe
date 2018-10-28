import React from 'react';
import Lodash from 'lodash';
import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DefaultNodeModel,
	DefaultPortModel
} from 'storm-react-diagrams';
import TrayWidget from './TrayWidget';
import TrayItemWidget from './TrayItemWidget';
import Modal from 'react-modal';
import {connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import { sendQuerySelect} from '../actions/dataActions';

import { Grid , Row , Col , Panel , Button, Navbar ,ButtonGroup  } from 'react-bootstrap';

const customStyles = {
    content : {

    width : '800px',
   
    position: 'absolute',
     top: '10%',
     left: '10%',
    transform: 'translate(-50%, -50%) !important'
    }
  };
  
  // Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
  //Modal.setAppElement('#yourAppElement')

class SelectModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isToggleOn: true , modalIsOpen: false
		, Query :[]};
	
		// This binding is necessary to make `this` work in the callback
		//this.handleClick = this.handleClick.bind(this);
	  }
	
	  


	 


	componentWillMount() {
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
	}


	Save =()=>{
		
		let { Query} = this.state ;
		console.log('query' + JSON.stringify(Query));
		this.props.sendQuerySelect(Query);
		this.props.close();
	}



	render() {
				let { modalIsOpen} = this.props ;
				let { Query} = this.state ;
		return (
            <div className="content">
            <Modal
            isOpen={modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >           
			
<h1> Select configuration </h1>

<ButtonGroup>
  <Button onClick={this.Save}>Save</Button>
  <Button onClick={this.props.close}>Close</Button>
</ButtonGroup>

 <Grid>
  <Row className="show-grid">

 <Col xs={6} md={4}>

<div>
  <Panel>
    <Panel.Heading>Columns</Panel.Heading>
    <Panel.Body>

<TrayWidget>
<TrayItemWidget model={{ type: 'in' }} name="Life_ID" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="Policy_ID" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="Gender" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="Age_at_Commencement" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="Policy_ID" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="UWY" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="Event_Amount_Insurer" color="#2196F3" />

</TrayWidget>
	</Panel.Body>
  </Panel> 
</div>
</Col>


  <Col xs={12} md={4}>

	<div style={{"background":"lightblue"}}
					className="diagram-layer"
					onDrop={event => {
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
						var node = null;
						Query.push(data.name)
						console.log('query is ' + JSON.stringify(Query))
						if (data.model.type === 'in') {
							node = new DefaultNodeModel(data.name , '#2196F3');
							node.addPort(new DefaultPortModel(true, 'in-1', 'In'));
						} else {
							node = new DefaultNodeModel(data.name , '#2196F3');
							node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
						}
						var points = this.engine.getRelativeMousePoint(event);
						node.x = points.x;
						node.y = points.y;
						this.engine.getDiagramModel().addNode(node);
						this.forceUpdate();
					}}
					onDragOver={event => {
						event.preventDefault();
					}}
				>
					<DiagramWidget diagramEngine={this.engine} />
				</div>
  </Col>


<Col xs={12} md={4}>
<h3> Operations </h3>

<div>
  <Panel>
    <Panel.Heading>Columns</Panel.Heading>
    <Panel.Body>

<TrayWidget>
<TrayItemWidget model={{ type: 'in' }} name="AND" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="OR" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="WHERE" color="#2196F3" />
</TrayWidget>
	</Panel.Body>
  </Panel> 
</div>

</Col>
 

  </Row>

  <Row>
  Hello 
  </Row>    
  </Grid>

			
            </Modal>
            </div>
		);
	}
}



const mapStateToProps = (state) => {
	
	return {

	}
}




const mapDispatchToProps = (dispatch) => {
	return {
			// same effect
			//firstAction : () => dispatch(action1()),
			sendQuerySelect : bindActionCreators(sendQuerySelect, dispatch),
	}
};

export default connect(mapStateToProps,mapDispatchToProps)(SelectModal);


