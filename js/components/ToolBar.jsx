import React from "react";
import ReactDOM from "react-dom";

import ToolButton from './ToolButton';
import ToggleToolButton from './ToggleToolButton';

import DataTools from './utils/datatools';
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

    this.dataTools=new DataTools ();
    this.toolbarTools=new ToolbarTools ();

    this.state = {      
      items: this.toolbarTools.prep(props.data),
      groups: this.toolbarTools.createGroups(props.data),
      poppedup: null
    };
    
    this.handleIconClicked = this.handleIconClicked.bind(this);
  }

  /**
   * Propagate back up to whomever called us
   */
  handleIconClicked (e) {
    //console.log ("handleIconClicked ("+e+")");

    this.setState ({poppedup: null});

    if (this.props.handleIconClicked) {
      let item=this.toolbarTools.findByUUID (e,this.state.items.items);
      if (item==null) {
        console.log ("Internal error: unable to find menu item object from id");
        return;
      }

      if (item.type=="menu") {
        this.setState ({poppedup: item.uuid});
        return;
      }

      if (item.group) {        
        let updatedGroups=this.dataTools.deepCopy (this.state.groups);
        let aGroup=updatedGroups [item.group];
        if (aGroup!=null) {
          aGroup.selected=item.uuid;
          this.setState ({groups: updatedGroups},(e) => {
            this.props.handleIconClicked (e,item);
          });
        } else {
          console.log ("Internal error: no group found for selected toggle button");
        }
      } else {
        this.props.handleIconClicked (e,item);
      }
    }
  }

  /**
   *
   */
  renderItem (item,i) {
    
      if (item.group) {
        let aGroup=this.state.groups [item.group];

        if (item.label) {
          return(<ToggleToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} managed={true} mode={0} selected={aGroup.selected} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} label={item.label} />);  
        } else {
          if (item.icon) {
            return(<ToggleToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} managed={true} mode={0} selected={aGroup.selected} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} icon={item.icon} />);  
          } else {
            return(<ToggleToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} managed={true} mode={0} selected={aGroup.selected} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} image={item.image} />);  
          }
        }            
      } else {
        if (item.label) {
          return(<ToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} label={item.label} />);  
        } else {
          if (item.icon) {
            return(<ToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} icon={item.icon} />);  
          } else {
            return(<ToolButton inverted={this.props.data.inverted} key={"menu-"+item.uuid} buttonid={item.uuid} alt={item.alt} title={item.title} onButtonClick={(e) => this.handleIconClicked (item.uuid)} image={item.image} />);  
          }
        }  
      }

    return (<div></div>);
  }

  /**
   *
   */
  renderBar (data,toolClass) {
    let items=[];

    for (let i=0;i<data.items.length;i++) {
      let item=data.items [i];

      if (item.type=="divider") {
        items.push(<div key={"menu-"+i} className="separatorhorizontal"/>);
      }

      if ((item.type=="button") || (item.type=="menu")) {
        let renderItem=this.renderItem (item,i);
        if (renderItem) {
          items.push(renderItem);
        } else {
          console.log ("bump");
        }
      }

      if (item.type=="menu") {
        if (this.state.poppedup) {
          if (this.state.poppedup==item.uuid) {
            let subitems=[];
            for (let j=0;j<item.items.length;j++) {           
              let subitem=item.items [j];            
              subitems.push(this.renderItem (subitem,j));  
            }              

            let submenu=<div key="submenu" className="popupmenu toolbarfillermedium">{subitems}</div>;
            items.push (submenu);              
          }
        }
      }
    }

    return (items);
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
      items=this.renderBar (data,toolClass);
    }

    let floatmenu;

    if (data.floatable) {
      console.log ("ding");
      if (this.state.items.floatable==true) {
        floatmenu=<div className="floathandle"></div>;
      }
    }    
                  
    return (<div id="toolbar" className={toolClass}>{floatmenu}{items}</div>);   
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

    return (<div id="toolbar" className={toolClass}>
       {this.props.children}
     </div>);
  }
}

export default ToolBar;
