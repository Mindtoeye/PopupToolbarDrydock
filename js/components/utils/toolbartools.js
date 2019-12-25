
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
 
    let groupId=this.dataTools.uuidv4 ();

  	if (!prepped ["inverted"]) {
  	  prepped.inverted=false;
  	}

    let items=prepped.items;

  	for (let i=0;i<items.length;i++) {
  	  let item=items [i];
  	  item.uuid=this.dataTools.uuidv4 ();
  	  //item.group=item.group + "-"+groupId;

      // We must go deeper
  	  if (item.type=="menu") {
  	  	
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
  	  if (item.type=="button") {
  	    if (item.id==anItemId) {
  	  	  return (item);
  	    }
  	  }

      // We must go deeper
  	  if (item.type=="menu") {
  	  	
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
  	  if (item.type=="button") {
  	  	//console.log (JSON.stringify (item));
  	  	//console.log ("Comparing " + item.uuid + ", to: " + anItemId);
  	    if (item.uuid==anItemId) {
  	  	  return (item);
  	    }
  	  }

      // We must go deeper
  	  if (item.type=="menu") {
  	  	
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
      	console.log ("Adding group: " + item.group);
      	groups [item.group] = {name: item.group, selected: null};
      }
  	}
  	
  	return (groups);
  }
}

export default ToolbarTools;
