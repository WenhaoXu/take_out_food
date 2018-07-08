'use strict';

const {loadAllItems} = require('./items');
const {loadPromotions} = require('./promotions');
var trim = require('lodash.trim');

function bestCharge(selectedItems) {
 let typeAndNumberOfOrders = format(selectedItems);
 let orderDetails=getItemDetails(typeAndNumberOfOrders,loadAllItems());
 orderDetails=countOrderItem(orderDetails);
 let gifts=getTypeAndNumberOfSaved(orderDetails,loadPromotions());
 let finalCount=getFinalCount(gifts,getAllCount(orderDetails));
 return  printOrderDetail(orderDetails,gifts,finalCount);
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
          let gifts=[];
          let saved=0;
          let savedNames='';
          for(let orderDetail of orderDetails ){
            if(promotions[1].items.includes(orderDetail.id))
            {
              saved=saved+orderDetail.count/2;
              savedNames=savedNames+orderDetail.name+'，'
            }
          }
          return choosePromotion(gifts,orderDetails,saved,savedNames);
}

function choosePromotion(gifts,orderDetails,saved,savedNames){
  if(getAllCount(orderDetails)>=30&&saved<6){
    gifts.push({
      type:'满30减6元',
      saved: 6
    })
 }else{
   gifts.push({
   type:'指定菜品半价',
   saved,
   savedNames,
 })}   
 return gifts;
}

function getFinalCount(gifts,allCount){
     let  finalCount={
       number:(allCount-gifts[0].saved)
     };   
      return finalCount;
}

function getAllCount(orderDetails){
       let count=0;
       for(let orderDetail of orderDetails){
            count =orderDetail.count+count;
       }
       return count;
}

function printOrderDetail(orderDetails,gifts,finalCount){
  let result='============= 订餐明细 =============\n'
  orderDetails.map(orderDetail=>{
    result=result+orderDetail.name+' x '+orderDetail.number+" = "+orderDetail.count+'元'+'\n'
  })
  result=result+'-----------------------------------\n'
  if(gifts[0].saved!==0){
    let giftItem=getGiftItem(gifts);
    result=result+"使用优惠:\n"+giftItem;
  }
result=result+'总计：'+finalCount.number+'元\n'+'===================================';
return result;
}
 
function getGiftItem(gifts){
  let giftItem="";
  if (gifts[0].hasOwnProperty('savedNames')){
    giftItem=gifts[0].type+'('+gifts[0].savedNames.substring(0,gifts[0].savedNames.length-1)+')'+'，省'+gifts[0].saved+"元"+'\n-----------------------------------\n';
  }
  else{
    giftItem=gifts[0].type+'，省6元'+'\n-----------------------------------\n';
  }
  return giftItem;
}

module.exports={
  bestCharge,
  format,
  getItemDetails,
  countOrderItem,
  getTypeAndNumberOfSaved
 }