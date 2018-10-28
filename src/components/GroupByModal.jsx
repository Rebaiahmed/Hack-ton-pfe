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

import { sendQueryGroupBY } from '../actions/dataActions';

import { Grid , Row , Col , Panel , Button ,ButtonGroup,ListGroup,ListGroupItem
,FormGroup,FormControl,ControlLabel  } from 'react-bootstrap';

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

class GroupModal extends React.Component {

	constructor(props) {
		super(props);
    this.state = {isToggleOn: true , modalIsOpen: false ,
      Query :[]};
	
		// This binding is necessary to make `this` work in the callback
		//this.handleClick = this.handleClick.bind(this);
	  }
	
	  


    Save =()=>{
		
      let { Query} = this.state ;
      console.log('query groupby' + JSON.stringify(Query));
      this.props.sendQueryGroupBY(Query);
      this.props.close();
    }

	 


	componentWillMount() {
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
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
			
<h1> Group By  configuration </h1>

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
<ListGroup>    
<ListGroupItem> <TrayItemWidget model={{ type: 'in' }} name="Gender" color="#2196F3" /> </ListGroupItem>
</ListGroup>
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
						if (data.type === 'in') {
							node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'peru');
							node.addPort(new DefaultPortModel(true, 'in-1', 'In'));
						} else {
							node = new DefaultNodeModel('Node ' + (nodesCount + 1), 'hotpink');
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


<Col xs={6} md={4}>

<div>
  <Panel>
    <Panel.Heading>Agregate Columns</Panel.Heading>
    <Panel.Body>
    
<TrayWidget>
   
<Row className="show-grid">
    <Col xs={12} md={8}>
    <TrayItemWidget model={{ type: 'in' }} name="column1" color="#2196F3" />
    </Col>
    <Col xs={6} md={4}>
    <FormGroup controlId="formControlsSelect">
      <ControlLabel>Select</ControlLabel>
      <FormControl componentClass="select" placeholder="select">
        <option value="min">Min</option>
        <option value="other">Max</option>
      </FormControl>
    </FormGroup>
    </Col>
  </Row>


</TrayWidget>

	</Panel.Body>
  </Panel> 
</div>
</Col>
 

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
			sendQueryGroupBY : bindActionCreators(sendQueryGroupBY, dispatch),
	}
};




export default connect(mapStateToProps,mapDispatchToProps)(GroupModal);

