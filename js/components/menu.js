
import menuImage from '../../css/images/menu.png';

export const menu = {
  direction: "vertical",
  toolclass: "",
  inverted: true,
  items: [{
      type: "menu",
      id: "1",
      alt: "Main Menu",
      title: "Main Menu",
      image: menuImage,
      items: [{
        type: "button",
        id: "21",
        alt: "Sub Menu Item 1",
        title: "Sub Menu Item 1",
        label: "1"
      },{
        type: "button",
        id: "22",
        alt: "Sub Menu Item 2",
        title: "Sub Menu Item 2",
        label: "2"
      }],
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
      id: "5",
      alt: "Character Example 1",
      title: "Character Example 1",
      label: "A"
    },{
      type: "button",
      id: "6",
      alt: "Character Example 2",
      title: "Character Example 2",
      label: "b"
    },{
      type: "button",
      id: "7",
      alt: "Character Example 3",
      title: "Character Example 3",
      label: "C"
    },{
      type: "divider"
    },{
      type: "button",
      id: "8",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "1",
      group: "togglegroup"
    },{
      type: "button",
      id: "9",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "2",
      group: "togglegroup"
    },{
      type: "button",
      id: "10",
      alt: "Toggle Example",
      title: "Toggle Example",
      label: "3",
      group: "togglegroup"
    },{
      type: "divider"
    },{
      type: "menu",
      id: "11",
      alt: "Secondary Menu",
      title: "Secondary Menu",
      image: menuImage,
      items: [{
        type: "button",
        id: "111",
        alt: "Sub Menu Item A",
        title: "Sub Menu Item A",
        label: "3"
      },{
        type: "button",
        id: "112",
        alt: "Sub Menu Item B",
        title: "Sub Menu Item B",
        label: "4"
      }],    	
	}]
};
