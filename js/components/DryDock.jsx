import React, { Component } from 'react';

import DataTools from './utils/datatools';
import ToolBar from './ToolBar';

import '../../css/main.css';

const menu=[];

/**
 * 
 */
class DryDock extends Component {

  /**
   *
   */
  constructor(props) {
    super(props);
    
    this.dataTools=new DataTools ();
  
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  /**
   *
   */
  handleIconClicked (anApp) {
    console.log ("handleIconClicked ()");

  }

  /**
   *
   */
  render() {
    return (
      <div className="maincontainer">
        <ToolBar direction="vertical" data={menu} handleIconClicked={this.handleIconClicked}>
        </ToolBar>
        <div id="center" className="center">
        </div>  
      </div> 
    );
  }
}

export default DryDock;
