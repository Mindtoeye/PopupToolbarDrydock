
import DataTools from './datatools';

/**
 *
 */
class ToolbarTools {

  constructor () {
  	this.dataTools=new DataTools ();
  }	
	
  /**
   *
   */
  prep (anItemSet) {
  	let prepped=this.dataTools.deepCopy (anItemSet);
 
  	if (!prepped ["inverted"]) {
  	  prepped.inverted=false;
  	}

    let items=prepped.items;

  	for (let i=0;i<items.length;i++) {
  	  let item=items [i];
  	  item.uuid=this.dataTools.uuidv4 ();
 
      // We must go deeper
  	  if (item.type=="menu") {        
  	  	items [i]=this.prep(item);
        //console.log (JSON.stringify (item));
  	  }
  	}

  	return (prepped);
  }

  /**
   *
   */
  findById (anItemId,items) {
  	for (let i=0;i<items.length;i++) {
  	  let item=items [i];
  	  
  	  if ((item.type=="button") || (item.type=="menu")) {
  	    if (item.id==anItemId) {
  	  	  return (item);
  	    }
  	  }

      // We must go deeper
  	  if (item.type=="menu") {
  	  	let result=this.findById (anItemId,item.items);
  	  	if (result!=null) {
  	  	  return (result);
  	  	}
  	  }
  	}

    return (null);
  }

  /**
   *
   */
  findByUUID (anItemId,items) {
  	for (let i=0;i<items.length;i++) {
  	  let item=items [i];
    
      if ((item.type=="button") || (item.type=="menu")) {
  	    if (item.uuid==anItemId) {
  	  	  return (item);
  	    }
  	  }

      // We must go deeper
  	  if (item.type=="menu") {
  	  	let result=this.findByUUID (anItemId,item.items);
  	  	if (result!=null) {
  	  	  return (result);
  	  	}
  	  }	  
  	}

    return (null);
  }

  /**
   *
   */
  createGroups (data) {
  	let groups={};
  	
    let items=data.items;

  	for (let i=0;i<items.length;i++) {
  	  let item=items [i];
      if (item.group) {
      	groups [item.group] = {name: item.group, selected: null};
      }
  	}
  	
  	return (groups);
  }
}

export default ToolbarTools;
