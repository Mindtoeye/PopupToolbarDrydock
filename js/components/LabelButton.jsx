import React from "react";
import ReactDOM from "react-dom";

import ToolbarTools from './utils/toolbartools';

import '../../css/toolbar.css';

/**
 *
 */
export class LabelButton extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.toolbarTools=new ToolbarTools ();

    this.state={
      enabled: props.enabled
    };

    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  /**
   * 
   */  
  componentWillReceiveProps(nextProps) {            
    if (typeof nextProps.enabled !== 'undefined') {
      this.setState ({enabled: nextProps.enabled}); 
    }
  }

  /**
   *
   */  
  handleIconClicked (anId) {
    console.log ("handleIconClicked ("+anId+")");
    if (this.props.onButtonClick) {
      this.props.onButtonClick (anId);
    }
  }

  /**
   *
   */
  render () {
  	let anId=this.props.buttonid;
    let buttonClass="toollabel";
    let inverted=false;

    if (this.props.inverted) {
      if (this.props.inverted==true) {
        inverted=true;
      }
    }    

    if (this.state.enabled==false) {
      buttonClass="toollabel tool-disabled";
    } else {
      buttonClass="toollabel tool-enabled";
    }

    if (this.props.label) {
      return (<div className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.title} title={this.props.title}>{this.props.label}</div>)
    }    

    return (<div className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.title} title={this.props.title}>{this.props.children}</div>);
  }
}

export default LabelButton;
