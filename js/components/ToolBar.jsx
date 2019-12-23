import React from "react";
import ReactDOM from "react-dom";

import ToolButton from './ToolButton';
import ToggleToolButton from './ToggleToolButton';
import ToolButtonFloat from './ToolButtonFloat';
import ToggleGroup from './ToggleGroup';

import ToolbarTools from './utils/toolbartools';

import '../../css/toolbar.css';
import '../../css/dividers.css';

/**
 *
 */
export class ToolBar extends React.Component {

  /**
   *
   */
  constructor(props){
    super(props);

    this.toolbarTools=new ToolbarTools ();

    this.state = {      
      items: this.toolbarTools.prep(props.data)
    };
    
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  /**
   * Propagate back up to whomever called us
   */
  handleIconClicked (e) {
    if (this.props.handleIconClicked) {
      let item=this.toolbarTools.findByUUID (e,this.state.items.items);
      this.props.handleIconClicked (e,item);
    }
  }

  /**
   *
   */
  renderFromData (data) {
    let toolClass="toolbarvertical";

    if (data.direction=="vertical") {
      toolClass="toolbarvertical"
    } else {
      toolClass="toolbarhorizontal"
    }

    if (this.props.direction=="vertical") {
      toolClass="toolbarvertical"
    } else {
      toolClass="toolbarhorizontal"
    }

    if (data.toolclass) {
      toolClass = toolClass + " " + this.props.toolclass;
    }

    let items=[];

    if (data.items) {
      for (let i=0;i<data.items.length;i++) {
        let item=data.items [i];

        if (item.type=="divider") {
          items.push(<div key={"menu-"+i} className="separatorhorizontal"/>);
        }

        if (item.type=="button") {
          if (item.label) {
            items.push(<ToolButton inverted={this.props.data.inverted} key={"menu-"+i} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} label={item.label} />);  
          } else {
            if (item.icon) {
              items.push(<ToolButton inverted={this.props.data.inverted} key={"menu-"+i} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} icon={item.icon} />);  
            } else {
              items.push(<ToolButton inverted={this.props.data.inverted} key={"menu-"+i} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} image={item.image} />);  
            }
          }  
        }

        if (item.type=="menu") {
          //items.push(<ToolButton buttonid="15" alt={item.alt} title={item.title} onButtonClick={this.handleIconClicked.bind (this)} image={item.image} />);
        }      
      }
    }
                  
    return (<div id="toolbar" className={toolClass}>{items}</div>);   
  }

  /**
   *
   */
  render () {
    if (this.state.items) {
      return (this.renderFromData (this.state.items));
    }

    let toolClass="toolbarvertical";

    if (this.props.direction=="vertical") {
      toolClass="toolbarvertical"
    } else {
      toolClass="toolbarhorizontal"
    }

    if (this.props.toolclass) {
      toolClass = toolClass + " " + this.props.toolclass;
    }

    return (<div id="toolbar" className={toolClass}>{this.props.children}</div>);    
  }
}

export default ToolBar;
