'use strict';

const {loadAllItems} = require('../src/items');
const {loadPromotions} = require('../src/promotions');
const {bestCharge,format,getItemDetails} =require('../src/best-charge');
var trim = require('lodash.trim');



describe('test format function',function(){
it ('should have same type and number',function(){
  let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
  let summary =format(inputs);
  let expected=[{id:'ITEM0001',number:1},{id:'ITEM0013',number:2},{id:'ITEM0022',number:1}];
  expect(summary).toEqual(expected)
});
});


describe('test getItemDetails function',function(){
  it ('should have same orderDeatil',function(){
    let inputs = [{id:'ITEM0001',number:1},{id:'ITEM0013',number:2},{id:'ITEM0022',number:1}];
    let summary =getItemDetails(inputs,loadAllItems());
    let expected=[{id:'ITEM0001',number:1,name: '黄焖鸡',price: 18.00},
                  {id:'ITEM0013',number:2, name: '肉夹馍',price: 6.00},
                  {id:'ITEM0022',number:1,name: '凉皮',price: 8.00}];
    expect(summary).toEqual(expected)
  });
  });








describe('Take out food', function () {

  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = trim(bestCharge(inputs));
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`;
expected=trim(expected);
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = trim(bestCharge(inputs));
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`;
expected=trim(expected);
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = trim(bestCharge(inputs));
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`;
expected=trim(expected);
    expect(summary).toEqual(expected)
  });

});