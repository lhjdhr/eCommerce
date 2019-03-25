/*
直接更新state的多个方法的对象
 */
import Vue from 'vue'
import {
  RECEIVE_goods,
  RECEIVE_goodsInfo ,
  RECEIVE_searchGoods,
  RECEIVE_storeInfo,
  RECEIVE_storeGoods,
  RECEIVE_userInfo,
  INCREMENT_foodCount,
  DECREMENT_foodCount,
  CLEAR_CART,
  RECEIVE_shopCart,
  CREATE_store,
  EDIT_userinfo,
  ADD_ITEM,
  RESET_userInfo,
  RECEIVE_order ,
  RECEIVE_orderInfo,
 
} from './mutation-types'
// import { it } from 'mocha';
import { changeCar} from "../api";
import Axios from 'axios';
import ind from '../api/index';
 
//const BASE_URL = 'http://192.168.43.178:10012'
const BASE_URL = '/api'

export default {
  [RECEIVE_storeGoods] (state, {storeGoods}) {
    state.storeGoods= storeGoods
  },
  [RECEIVE_orderInfo] (state, {orderInfo}) {
    state.orderInfo= orderInfo
  },
  [RECEIVE_order] (state, {order}) {
    state.order = order
  },
  [CREATE_store] (state, {store}) {
    state.store = store
  },
  [RECEIVE_goods] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_goodsInfo ] (state, {goodsInfo }) {
    state.goodsInfo  = goodsInfo 
  },
  [RECEIVE_searchGoods] (state, {searchGoods}) {
    state.searchGoods = searchGoods
  },
  [RECEIVE_storeInfo] (state, {storeInfo}) {
    state.storeInfo = storeInfo
  },
  [RECEIVE_userInfo] (state, {userInfo}) {
    state.userInfo = userInfo
  },
 
  [RESET_userInfo](state){
    state.userInfo = ''
  },
  
  [EDIT_userinfo] (state, {userInfo}) {  
    state.userInfo = userInfo                
  },

 async [INCREMENT_foodCount] (state, {food}) {
  const result=await changeCar({goodsId:food.goodsId,count: 1,userId:localStorage.getItem('userId')});

    if(!food.goodsCount){ 
          Vue.set(food,"goodsCount",1)//让新增的属性也有数据绑定
          state.shopCart.push(food) //添加到购物车 
    }else{  //已经有food的情况
      food.goodsCount++;     
    }
  },
 async [DECREMENT_foodCount] (state, {food}) {
    if(food.goodsCount){ //count有值才减一
      food.goodsCount--;
      const result=await changeCar({goodsId:food.goodsId,count:-1,userId:localStorage.getItem('userId')});
      if(result.resultCode == "SUCCESS"){  
        console.log("商品数量-1")
      } else{
        console.log(result.message);
      } 
      if(food.goodsCount==0){//将food移除
        state.shopCart.splice(state.shopCart.indexOf(food),1)
        var Url= `${BASE_URL}/shopCart/delete?userId=`+localStorage.getItem('userId')+"&shopCartId="+food.shopCartId
         console.log("Url"+Url)
        Axios
        .delete(Url)
        .then(function(data,err){
          console.log(data)
        })
      }
    }       
  },
  [RECEIVE_shopCart] (state, {shopCart}) { //这里的shopCart是actions里面的方法传过来的数据results
    state.shopCart = shopCart                //将后端的shopCart和state里面的shopCart实现同步
  },
  [ADD_ITEM] (state) {
    let isHas=state.shopCart.some(item=>{
      if(item.id==id){
        item.count++
        return true;
      }else{
        return false
      }
    })
    if(!isHas){
      state.shopCart.push({id,goodsName,money,count:1})
    }
  },

  // addGood(state,{id,goodsName,money}){
  //   let isHas=state.shopCart.some(item=>{
  //     if(item.id==id){
  //       item.count++
  //       return true;
  //     }else{
  //       return false
  //     }
  //   })
  //   if(!isHas){
  //     state.shopCart.push({id,goodsName,money,count:1})
  //   }
  // },
   

  remove(state,{shopCartId}){
    let len=state.shopCart.length
    for(var i=0;i<len;i++){
      if(state.shopCart[i]==shopCartId){
        state.shopCart.splice(i,1)
        break;
      }
    }
  },

  [CLEAR_CART](state){
    state.shopCart.forEach(food=>food.count=0) //将所有food的count置为0
    state.shopCart=[]//置为空数组
  },

  
  
   
}