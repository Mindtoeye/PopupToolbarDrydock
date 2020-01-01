import React from "react";
import ReactDOM from "react-dom";

import ToolButton from './ToolButton';
import ToggleToolButton from './ToggleToolButton';

import DataTools from './utils/datatools';
import ToolbarTools from './utils/toolbartools';
import DOMTools from './utils/domtools';

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
    this.DOMTools=new DOMTools ();

    this.state = {      
      items: this.toolbarTools.prep(props.data),
      groups: this.toolbarTools.createGroups(props.data),
      poppedup: null,
      popupX: 0,
      popupY: 0
    };
    
    this.handleIconClicked = this.handleIconClicked.bind(this);
    this.onGlobalMouseDown = this.onGlobalMouseDown.bind(this);
  }

  /**
   *
   */
  onGlobalMouseDown (e) {
    //this.setState ({poppedup: null});
  }

  /**
   * Propagate back up to whomever called us
   */
  handleIconClicked (e) {
    this.setState ({poppedup: null});

    if (this.props.handleIconClicked) {
      let item=this.toolbarTools.findByUUID (e,this.state.items.items);
      if (item==null) {
        console.log ("Internal error: unable to find menu item object from id");
        return;
      }

      // Remember that a menu can also be part of a group
      if (item.type=="menu") {
        if (this.state.poppedup==item.uuid) {
          this.setState ({poppedup: null});
          return;
        }
        // Get the location of the button that should visually anchor
        // the sub menu
        let loc=this.DOMTools.getElementLocation (this.refs,item.uuid);

        let x=loc.x;
        let y=loc.y;

        this.setState ({
          poppedup: item.uuid,
          popupX: x,
          popupY: y
        },(e) => {
          this.refs["focusable"].focus();
        });
        return;
      }

      if (item.group) {
        //let selected = null;
        let aParent = this.toolbarTools.getParent (item,this.state.items.items);

        if (aParent!=null) {
          console.log ("We have a parent");
          if (aParent.group!=null) {
            console.log ("We have found a group id")

            let updatedGroups=this.dataTools.deepCopy (this.state.groups);            
            let aGroup=updatedGroups [aParent.group];
            if (aGroup!=null) {
              console.log ("We have a parent group, selecting ...")
              aGroup.selected=aParent.uuid;
              this.setState ({
                groups: updatedGroups},(e) => {
                this.props.handleIconClicked (e,item);
              });
            } else {
              console.log ("Internal error: no group found for selected toggle button");
            }
          }
        } else {
          console.log ("This button has a group but no parent");
        }

        let updatedGroups=this.dataTools.deepCopy (this.state.groups);
        let aGroup=updatedGroups [item.group];
        if (aGroup!=null) {
          aGroup.selected=item.uuid;
          this.setState ({
            groups: updatedGroups},(e) => {
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
  renderItem (item) {
    if (item.group) {
      let aGroup=this.state.groups [item.group];

      if (item.label) {
        return(<ToggleToolButton 
          inverted={this.props.data.inverted} 
          key={item.uuid} 
          ref={item.uuid} 
          id={item.uuid} 
          buttonid={item.uuid} 
          managed={true} 
          mode={0} 
          selected={aGroup.selected} 
          title={item.title} 
          handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
          onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
          label={item.label} />);  
      } else {
        if (item.icon) {
          return(<ToggleToolButton 
            inverted={this.props.data.inverted} 
            key={item.uuid} 
            ref={item.uuid} 
            id={item.uuid} 
            buttonid={item.uuid} 
            managed={true} 
            mode={0} 
            selected={aGroup.selected} 
            title={item.title} 
            handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
            onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
            icon={item.icon} />);  
        } else {
          return(<ToggleToolButton 
            inverted={this.props.data.inverted} 
            key={item.uuid} 
            ref={item.uuid} 
            id={item.uuid} 
            buttonid={item.uuid} 
            managed={true} 
            mode={0} 
            selected={aGroup.selected} 
            title={item.title} 
            handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
            onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
            image={item.image} />);  
        }
      }            
    } else {
      if (item.label) {
        return(<ToolButton 
          inverted={this.props.data.inverted} 
          key={item.uuid} 
          ref={item.uuid} 
          id={item.uuid} 
          buttonid={item.uuid} 
          title={item.title} 
          handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
          onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
          label={item.label} />);  
      } else {
        if (item.icon) {
          return(<ToolButton 
            inverted={this.props.data.inverted} 
            key={item.uuid} 
            ref={item.uuid} 
            id={item.uuid} 
            buttonid={item.uuid} 
            title={item.title} 
            handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
            onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
            icon={item.icon} />);  
        } else {
          return(<ToolButton 
            inverted={this.props.data.inverted} 
            key={item.uuid}ref={item.uuid} 
            id={item.uuid} 
            buttonid={item.uuid} 
            title={item.title} 
            handleFocusOut={(e) => this.onGlobalMouseDown (e)} 
            onButtonClick={(e) => this.handleIconClicked (item.uuid)} 
            image={item.image} />);  
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
        let renderItem=this.renderItem (item);
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
              subitems.push(this.renderItem (subitem));  
            }              

            let calculatedStyle={left: (this.state.popupX+10), top: (this.state.popupY+10)};

            let w=window.innerWidth;
            let h=window.innerHeight;
            let wMid=(window.innerWidth/2);
            let hMid=(window.innerHeight/2);

            console.log ("midX: " + wMid + ", midY: " + hMid + " => ("+this.state.popupX+","+this.state.popupY+")");

            if ((this.state.popupX>wMid) && (this.state.popupY>hMid)) {
              calculatedStyle={right: (10), bottom: (10)};
            } else {
             if (this.state.popupX>wMid) {
               calculatedStyle={right: (10), top: (this.state.popupY+10)};
             } else {
               if (this.state.popupY>hMid) {
                 calculatedStyle={left: (this.state.popupX+10), bottom: (10)};
               }               
             }
            }

            let submenu=<div key="submenu" tabIndex="0" ref="focusable" onBlur={this.onGlobalMouseDown} className="popupmenu toolbarfillermedium" style={calculatedStyle}>{subitems}</div>;
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
