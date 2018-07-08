'use strict';

const {loadAllItems} = require('./items');
const {promotions} = require('./promotions');
var trim = require('lodash.trim');

function bestCharge(selectedItems) {
 let typeAndNumberOfOrders = format(selectedItems);
 let orderDetails=getItemDetails(typeAndNumberOfOrders,loadAllItems());
 orderDetails=countOrderItem(orderDetails);
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

function countOrderItem(orderDetails){
  orderDetails.map(orderDetail=>{
    let mycount;
      mycount = orderDetail.number * orderDetail.price;
      orderDetail.count = mycount;
  })
  return orderDetails;
}

module.exports={
  bestCharge,
  format,
  getItemDetails,
  countOrderItem
 }