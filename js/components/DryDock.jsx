import React, { Component } from 'react';

import DataTools from './utils/datatools';
import ToolbarTools from './utils/toolbartools';
import ToolBar from './ToolBar';

import '../../css/main.css';

import menuImage from '../../css/images/menu.png';

const menu = {
  direction: "vertical",
  toolclass: "",
  inverted: true,
  items: [{
      type: "button",
      id: "1",
      alt: "Main Menu",
      title: "Main Menu",
      image: menuImage
    },{
      type: "divider"
    },{
      type: "button",
      id: "2",
      alt: "Materials Icon Example 1",
      title: "Materials Icon Example 1",
      icon: "add_circle"
    },{
      type: "button",
      id: "3",
      alt: "Materials Icon Example 2",
      title: "Materials Icon Example 2",
      icon: "check_circle"
    },{
      type: "divider"
    },{
      type: "button",
      id: "4",
      alt: "Character Example 1",
      title: "Character Example 1",
      label: "A"
    },{
      type: "button",
      id: "4",
      alt: "Character Example 2",
      title: "Character Example 2",
      label: "b"
    },{
      type: "button",
      id: "4",
      alt: "Character Example 3",
      title: "Character Example 3",
      label: "C"
    },{
      type: "divider"
    },{
      type: "button",
      id: "4",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "1",
      group: "togglegroup"
    },{
      type: "button",
      id: "4",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "2",
      group: "togglegroup"
    },{
      type: "button",
      id: "4",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "3",
      group: "togglegroup"
    }]
};

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
    this.toolbarTools=new ToolbarTools ();

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
    //console.log ("handleIconClicked ("+anId+")");

    this.setState ({selected: anItem});
  }

  /**
   *
   */
  render() {
    let pre;

    if (this.state.selected!=null){
      pre=<pre>{JSON.stringify(this.state.selected, null, 2)}</pre>;
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
              <ToolBar direction="vertical" data={this.state.menu1} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
            <div className="divTableCell center">
              <div id="tip" className="tip centered">
                You should see 4 toolbars each with different configurations, but with the same
                data being displayed. Not all possible configurations are currently shown however.
                <hr />
                <div className="json">                
                  {pre}
                </div>
              </div>  
            </div>
            <div className="divTableCell filler toolbarwidth">
              <ToolBar direction="vertical" data={this.state.menu2} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
          </div>
          <div className="divTableRow toolbarheight">
            <div className="divTableCell filler toolbarwidth"></div>
            <div className="divTableCell filler">
              <ToolBar direction="horizontal" data={this.state.menu1} handleIconClicked={this.handleIconClicked}></ToolBar>
            </div>
            <div className="divTableCell filler toolbarwidth"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DryDock;
