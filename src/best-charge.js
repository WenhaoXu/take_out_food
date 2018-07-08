'use strict';

const {loadAllItems} = require('./items');
const {promotions} = require('./promotions');
var trim = require('lodash.trim');

function bestCharge(selectedItems) {
 let typeAndNumberOfOrders = format(selectedItems);
 let orderDetails=getItemDetails(typeAndNumberOfOrders,loadAllItems());
 orderDetails=countOrderItem(orderDetails);
 let gifts=getTypeAndNumberOfSaved(orderDetails,promotions());
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

function getTypeAndNumberOfSaved(orderDetails,promotions){
          let allCount=0;
          let gifts=[];
          let saved=0;
          for(let orderDetail of orderDetails ){
            allCount=allCount+orderDetail.count;
            if(promotions[1].items.includes(orderDetail.id))
            {
              saved=saved+orderDetail.count/2;
            }
          }
          if(allCount>=30){
             gifts.push({
               type:'满30减6元',
               saved: 6
             })
          }
          gifts.push({
            type:'指定菜品半价',
            saved
          })
          return gifts;
}

module.exports={
  bestCharge,
  format,
  getItemDetails,
  countOrderItem,
  getTypeAndNumberOfSaved
 }