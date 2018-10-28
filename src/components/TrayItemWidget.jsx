import React from 'react';

import SelectModal from './SelectModal';
import CombineModal from './CombineByModal';
import  GroupModal from './GroupByModal' ;

export interface TrayItemWidgetProps {
	model: any,
	color?: string,
	name: string
}

export interface TrayItemWidgetState {}

export default class TrayItemWidget extends React.Component<TrayItemWidgetProps, TrayItemWidgetState> {
	
	
	constructor(props: TrayItemWidgetProps) {
		super(props);
		this.state = {
			modalIsOpen: false
		};
	this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
	}


	openModal() {
		
		this.setState({modalIsOpen: true});
	  }
	
	  afterOpenModal() {
		// references are now sync'd and can be accessed.
		//this.subtitle.style.color = '#f00';
	  }
	
	  closeModal() {
		this.setState({modalIsOpen: false});
	  }

	render() {
		
		let { modalIsOpen } = this.state ;
		let modal ;
		switch (this.props.name) {
			case "SELECT":
				modal = <SelectModal modalIsOpen={modalIsOpen}
				close={this.closeModal} />
				break;
			case "COMBINE":
				modal = <CombineModal modalIsOpen={modalIsOpen}
				close={this.closeModal} />
				break;
			case "GroupBy":
				modal = <GroupModal modalIsOpen={modalIsOpen}
				close={this.closeModal} />
				break;				
		}
		return (
			<div
				style={{ background: this.props.color }}
				draggable={true}
				onDragStart={event => {
					
					var j = JSON.stringify({"model" :this.props.model,
					"name" :this.props.name});
					event.dataTransfer.setData('storm-diagram-node',j);
				}}
				className="tray-item"
				onDoubleClick={this.openModal}
			>
				{this.props.name}
				{modal}

				
			</div>
		);
	}
}
