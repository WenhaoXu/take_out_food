'use strict';

const {loadAllItems} = require('./items');
const {promotions} = require('./promotions');
var trim = require('lodash.trim');
var map = require('lodash.map');

function bestCharge(selectedItems) {
 let typeAndNumberOfOrders = format(selectedItems);
 let orderDetails=getItemDetails(typeAndNumberOfOrders,loadAllItems());
}


function format(selectedItems){ 
 return selectedItems.map(item=>{
  return item={
      id: trim(item.split('x')[0]),
      number: parseInt(trim(item.split('x')[1]))
   };
  })
}

function  getItemDetails(typeAndNumberOfOrders,items){
 return  typeAndNumberOfOrders.map(typeAndNumberOfOrder=>{
    items.map(item=>{ 
    if (typeAndNumberOfOrder.id === item.id) {
      typeAndNumberOfOrder.name = item.name;
      typeAndNumberOfOrder.price = item.price;
    }})
    return typeAndNumberOfOrder
  })

 }


module.exports={
  bestCharge,
  format,
  getItemDetails
 }