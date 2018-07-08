'use strict';

const {items} = require('./items');
const {promotions} = require('./promotions');
var trim = require('lodash.trim');

function bestCharge(selectedItems) {
  format(selectedItems);
}


function format(selectedItems){ 
 return selectedItems.map(item=>{
  return item={
      id: trim(item.split('x')[0]),
      number: parseInt(trim(item.split('x')[1]))
   };
  })
  
     
    
 
 
}

module.exports={
  bestCharge,
  format
 }