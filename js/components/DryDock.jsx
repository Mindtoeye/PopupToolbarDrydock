import React, { Component } from 'react';

import DataTools from './utils/datatools';
import ToolBar from './ToolBar';

import '../../css/main.css';

import { menu } from './menu';

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

    // Use the menu object as a template so that we can allow the toolbar code
    // to add unique identifiers. This way even though the structure is
    // identical all the menu items are still globally unique
    this.state = {
      selected: null,
      menu1: this.dataTools.deepCopy (menu),
      menu2: this.dataTools.deepCopy (menu),
      menu3: this.dataTools.deepCopy (menu),
      menu4: this.dataTools.deepCopy (menu)
    };
  
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  /**
   *
   */
  handleIconClicked (anId,anItem) {
    this.setState ({selected: anItem});
  }

  /**
   *
   */
  render() {
    let title;
    let id;
    let type;

    if (this.state.selected) {
      title="Title: " + this.state.selected.title;
      id="ID: " + this.state.selected.id;
      type="Type: " + this.state.selected.type;

      if (this.state.selected.group) {
        type="Type: " + this.state.selected.type + " (toggle)";
      }
    }

    return (
      <div className="divTable unstyledTable">
        <div className="divTableBody">
          <div className="divTableRow toolbarheight">
            <div className="divTableCell filler toolbarwidth"></div>
            <div className="divTableCell filler">
              <ToolBar direction="horizontal" data={this.state.menu1} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
            <div className="divTableCell filler toolbarwidth"></div>
          </div>
          <div className="divTableRow">
            <div className="divTableCell filler toolbarwidth">
              <ToolBar direction="vertical" data={this.state.menu2} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
            <div className="divTableCell center">
              <div id="tip" className="tip centered">
                You should see 4 toolbars each with different configurations, but with the same
                data being displayed. Not all possible layout configurations are currently shown 
                however.
                <hr />
                <div className="json">                
                  {title}
                  <br/>
                  {id}
                  <br/>
                  {type}                  
                </div>
              </div>  
            </div>
            <div className="divTableCell filler toolbarwidth">
              <ToolBar direction="vertical" data={this.state.menu3} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
          </div>
          <div className="divTableRow toolbarheight">
            <div className="divTableCell filler toolbarwidth"></div>
            <div className="divTableCell filler">
              <ToolBar direction="horizontal" data={this.state.menu4} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
            <div className="divTableCell filler toolbarwidth"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DryDock;
