import React from "react";
import ReactDOM from "react-dom";

import '../../css/toolbar.css';

/**
 *
 */
export class ToggleToolButton extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state = {
      on: false,
      id: props.buttonid,
      managed: props.managed,
      mode: props.mode
    };

    this.propagate.bind (this);
  }

  /**
   *
   */  
  handleIconClicked () {
    if (this.state.managed==true) {
      this.propagate ();
      return;
    }

    if(this.state.on==false) {
      this.setState ({on: true},(e)=>{
      	this.propagate ();
      });
    } else {
      this.setState ({on: false},(e)=>{
      	this.propagate ();
      });    	
    }
  }

  /**
   *
   */
  setToggleState (aState) {
    console.log ("setToggleState ("+aState+")");
    this.setState ({on: aState});         
  }

  /**
   *
   */
  getId () {
    return (this.state.id);
  }

  /**
   *
   */  
  propagate () {
  	if (this.props.onButtonClick) {
      this.props.onButtonClick (this.state.id);
    }
  }

  /**
   *
   */
  render () {
  	var anId=this.props.buttonid;

    var face=<img src={this.props.image} className="icon" />;

    if (this.props.icon) {
      face=<i className="material-icons">{this.props.icon}</i>
    }

    if (this.state.managed==true) {
      if (this.props.mode==this.props.selected) {
        return (<div className="toolicon toggleon" role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>); 
      } else {
        return (<div className="toolicon" role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>);
      }
    }

    if (this.state.on==true) {
      return (<div className="toolicon toggleon" role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>);	
    }

    return (<div className="toolicon" role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>);
  }
}

export default ToggleToolButton;
