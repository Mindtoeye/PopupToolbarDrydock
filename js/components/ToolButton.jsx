import React from "react";
import ReactDOM from "react-dom";

import ToolbarTools from './utils/toolbartools';

import '../../css/toolbar.css';

/**
 *
 */
export class ToolButton extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.toolbarTools=new ToolbarTools ();

    this.state={
      enabled: props.enabled
    };
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
    if (this.props.onButtonClick) {
      this.props.onButtonClick (anId);
    }
  }

  /**
   *
   */
  render () {
  	let anId=this.props.buttonid;
    let buttonClass="toolicon";
    let inverted=false;

    if (this.props.inverted) {
      if (this.props.inverted==true) {
        inverted=true;
      }
    }    

    if (this.state.enabled==false) {
      buttonClass="toolicon tool-disabled";
    } else {
      buttonClass="toolicon hoverable tool-enabled";
    }

    let face=<img src={this.props.image} className="icon" />;

    if (inverted==true) {
      face=<img src={this.props.image} className="icon iconinverted" />;
    }

    if (this.props.icon) {
      face=<i className="material-icons">{this.props.icon}</i>

      if (inverted==true) {
        face=<i className="material-icons iconinverted">{this.props.icon}</i>
      }
    }

    if ((this.props.image) || (this.props.icon)) {
      return (<div className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>)
    }

    return (<div className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{this.props.children}</div>);
  }
}

export default ToolButton;
