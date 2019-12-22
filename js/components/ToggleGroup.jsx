import React from "react";
import ReactDOM from "react-dom";

import '../../css/main.css';

/**
 *
 */
export class ToggleGroup extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.state = {
      selected: "-1"
    };
  }

  /**
   *
   */
  getSelectedId () {
  	return (this.state.selected);
  }

  /**
   *
   */
  render () {
    return (this.props.children);  	
  }
}

export default ToggleGroup;
