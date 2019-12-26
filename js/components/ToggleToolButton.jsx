import React from "react";
import ReactDOM from "react-dom";

import ToolbarTools from './utils/toolbartools';

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
      if (this.props.selected) {
        if (this.props.selected==this.props.buttonid) {
          buttonClass="tooliconselected hoverable tool-enabled";
        } else {
          buttonClass="toolicon hoverable tool-enabled";            
        }
      } else {
        buttonClass="toolicon hoverable tool-enabled";
      }
    }

    let face=<img src={this.props.image} className="icon" />;

    if (inverted==true) {
      face=<img src={this.props.image} className="icon iconinverted" />;
    }

    if (this.props.icon) {
      face=<i className="material-icons" style={{margin: "1px"}}>{this.props.icon}</i>

      if (inverted==true) {
        face=<i className="material-icons iconinverted" style={{margin: "1px"}}>{this.props.icon}</i>
      }
    }

    if (this.props.label){
      let character = this.props.label;
      return (<div key={this.props.id} className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}><div className="texticon">{character.toUpperCase()}</div></div>)
    }    

    if ((this.props.image) || (this.props.icon)) {
      return (<div key={this.props.id} className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{face}</div>)
    }

    return (<div key={this.props.id} className={buttonClass} role="button" aria-pressed="false" onClick={(e) => this.handleIconClicked(anId)} alt={this.props.alt} title={this.props.title}>{this.props.children}</div>);
  }
}

export default ToggleToolButton;
