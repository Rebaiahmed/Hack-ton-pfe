import React from 'react';
import Lodash from 'lodash';
import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DefaultNodeModel,
	DefaultPortModel,
	LinkModel
} from 'storm-react-diagrams';
import TrayWidget from './components/TrayWidget';
import TrayItemWidget from './components/TrayItemWidget';
import {bindActionCreators} from 'redux';
import { Grid , Row , Col , Panel , Button, Navbar  } from 'react-bootstrap';
import {connect} from 'react-redux';
import {files } from './Files';
import {sendQuery ,sendQueryGroupBY } from './actions/dataActions';
import * as actions from './actions/dataActions';
import Graph from './utils/Graph';

import './srd.css';


class DemoFive extends React.Component {

	constructor(props) {
		super(props);
		this.state = {isToggleOn: true , fileNames :[], operations :[], 
			my_query :new Graph(0) , fileName :''};
	
		// This binding is necessary to make `this` work in the callback
		//this.handleClick = this.handleClick.bind(this);
	  }
	
	  handlePreview = () => {
		// your code here
		this.props.history.push('/preview')
	  }


	  handleRun = (e) => {
		// your code here
		e.preventDefault()
		let { sql_query} = this.state ;
		if(sql_query)
		{
			console.log('query sql is' + sql_query)
		}
		
		this.props.sendQuery("Korea Policy File 100k.csv",sql_query)
	  }
	 
		componentWillReceiveProps(newProps){
     console.log('props new' + JSON.stringify(newProps));
}

	 


	componentWillMount() {
		this.engine = new DiagramEngine();
		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());
	}

    onDiagramActionStarted(event){
		console.log('started event !!')
		console.log(event)
	  }
	
	  onDiagramActionStopped(event){
		  console.log('stopped event !')
		console.log(event)
	  }




	render() {

		const datasets = files.map((file) =>
		<div key={file.id}>
		<TrayItemWidget model={{ type: 'out' }} name={file.fileName} color="#90CAF9" />
		</div>
	  );

   let { my_query ,operations} = this.state ;
	 let indice =0 ;


		return (
			<div className="content">

<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#home">Berexia Hackathon</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Navbar.Text>
	<Button bsStyle="info" onClick={this.handleRun}> Run </Button>
    </Navbar.Text>
    <Navbar.Text pullRight>  <Button bsStyle="info" onClick={this.handlePreview}> Preview  </Button></Navbar.Text>
  </Navbar.Collapse>
</Navbar>



 <Grid>
  <Row className="show-grid">
  <Col xs={12} md={8}>

	<div style={{"background":"lightblue"}}
					className="diagram-layer"
					onDrop={event => {

						//var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
						var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
					
						//_____chekc if the Node is a file _____//

						if(data.name)
						var nodesCount = Lodash.keys(this.engine.getDiagramModel().getNodes()).length;
						var node = null;
						var link1 = new LinkModel();
						let edge1,edge2 =null ;
						//_____add as the node as a vertex ______//
						my_query.addVertex(data.name);
						operations.push(data.name)
						edge1 = data.name ;
						if(operations.length ==0 || operations.length ==1)
						{
							console.log('operations table is' + JSON.stringify(operations) )
							my_query.addEdge(edge1,edge1)
							indice++;
						}else{
							console.log('operations table 2 is' + JSON.stringify(operations) )
							my_query.addEdge(operations[indice],operations[indice+1])
							indice ++;
						}
						
						my_query.printGraph()
						
						if (data.model.type === 'in') {
							node = new DefaultNodeModel(data.name, '#33bfff');
							let port1 = node.addPort(new DefaultPortModel(true, 'in-1', 'In'));
							link1.setSourcePort(port1);
							edge1 = data.name ;
							
						} else {
							node = new DefaultNodeModel(data.name, '#1c54b2');
							
							let port2= node.addPort(new DefaultPortModel(false, 'out-1', 'Out'));
							link1.setSourcePort(port2);
							edge2 = data.name;
						} 
						var points = this.engine.getRelativeMousePoint(event);
						node.x = points.x;
						node.y = points.y;
						//_____add edge____________//
						
						//my_query.printGraph()

						
						
						
		                
						this.engine.getDiagramModel().addNode(node);
						this.forceUpdate();
					}}
					onDragOver={event => {
						event.preventDefault();
					}}
				>
					<DiagramWidget diagramEngine={this.engine} 
					  />
				</div>
  </Col>

  <Col xs={6} md={4}>

<div>
  <Panel>
    <Panel.Heading>Transformations</Panel.Heading>
    <Panel.Body>

<TrayWidget>
<TrayItemWidget model={{ type: 'in' }} name="SELECT" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="COMBINE" color="#2196F3" />
<TrayItemWidget model={{ type: 'in' }} name="GroupBy" color="#2196F3" />
</TrayWidget>
	</Panel.Body>
  </Panel>
  <Panel>
    <Panel.Heading>
      <Panel.Title componentClass="h3">Datasets</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
<TrayWidget>
{ datasets}


</TrayWidget>
	</Panel.Body>
  </Panel>
</div>




</Col>

  </Row>
  </Grid>

			</div>
		);
	}
}

const mapStateToProps = (state) => {

	
	
    return {
		//results: state.results,
		//isLoading: state.isLoading,
		//sql_query :state.sql_query,
    }
}


/*function mapDispatchToProps(dispatch) {
    return {
        sendQuery: bindActionCreators(sendQuery, dispatch)
    };
}*/

/*const mapDispatchToProps = dispatch => {
	return {
		sendQuery: ("filename.csv") => {
		dispatch(sendQuery("filename.csv","SELECT"))
	  }
	};
  };*/


  /*const mapDispatchToProps = dispatch => {
	return {
		sendQuery: (filename,query) => {
		dispatch(sendQuery(filename,query));
	  }
	};
  };*/

  const mapDispatchToProps = (dispatch) => {
	  console.log('actions' + JSON.stringify(actions))
    return {
        // same effect
        //firstAction : () => dispatch(action1()),
		sendQuery : bindActionCreators(sendQuery, dispatch),
		sendQueryGroupBY : bindActionCreators(sendQueryGroupBY, dispatch),
		actions : bindActionCreators(actions, dispatch),
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(DemoFive);
