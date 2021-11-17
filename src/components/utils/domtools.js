import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 *
 */
class DOMTools {
	
  /**
   *
   */
  getPanelLocation (aPanel) {
  	let ref=ReactDOM.findDOMNode(this.refs[aPanel]);

  	if (ref!=null) {
  	  return (ref.getBoundingClientRect());
  	} else {
  	  console.log ("Internal error: can't obtain reference to panel: " + aPanel);
  	}
   
    return ({x: 10, y: 10, width: 100, height: 150});
  }

  /**
   *
   */
  getElementLocation (refs,anElement) {    
    let ref=ReactDOM.findDOMNode(refs[anElement]);

    if (ref!=null) {
      return (ref.getBoundingClientRect());
    } else {
      console.log ("Internal error: can't obtain reference to panel: " + anElement);
    }
   
    return ({x: 10, y: 10, width: 100, height: 150});
  }  
}

export default DOMTools;