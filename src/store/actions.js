/*
通过mutation间接更新state的多个方法的对象

*/
import axios from 'axios'
const BASE_URL = '/api'
import {Toast } from 'mint-ui'
import Vue from 'vue'
import {
  RECEIVE_goods,
  RECEIVE_goodsInfo,
  RECEIVE_searchGoods,
  RECEIVE_storeInfo,
  RECEIVE_storeGoods,
  INCREMENT_foodCount,
  DECREMENT_foodCount,
  RECEIVE_userInfo,
  CLEAR_CART,
  DEL,
  RECEIVE_shopCart,
  CREATE_store,
  EDIT_userinfo,
  ADD_ITEM,
  RESET_userInfo,
  RECEIVE_order,
  RECEIVE_orderInfo,
} from "./mutation-types";
import {
  reqAllFoods,
  reqGoodsInfo,
  reqStoreInfo,
  reqStoreGoods,
  reqUserInfo,
  reqShopCart,
  createStore,
  infoEdit,
  reqSearchShops,
  reqOrder,
  reqOrderDetail,
  addGood,
  changeCar,
  paidOrder
} from "../api";
import {addGoods} from './mutations'
import ajax from "../api/ajax";

export default {
  //提交订单
  async confrimOrders({
    commit
  }, param) {
    const result = await paidOrder(param)
  },
  // 异步获取所有商品
  async getAllFoods({
    commit
  }) {
    // 发送异步ajax请求
    const result = await reqAllFoods();
    // 提交一个mutation
    console.log("这里获取的是首页所有的商品");
    console.log(result);
    if (result.resultCode === "SUCCESS") {
      const goods = result.data.list;
      commit(RECEIVE_goods, {
        goods
      });
    }
  },
  // 异步登出
  async logout({
    commit
  }) {
    commit(RESET_userInfo)
  },
  //异步获取按照id查询到的商品
  async getGoodsInfo({
    commit
  }, param) {
    // 发送异步ajax请求
    console.log("商品详情 的id");
    console.log(param);
    const result = await reqGoodsInfo(param);
    // 提交一个mutation
    console.log("----------goodsInfo -----------");
    console.log(result);
    if (result.resultCode === "SUCCESS") {
      const goodsInfo = result.data;
      commit(RECEIVE_goodsInfo, {
        goodsInfo
      });
    }
  },

  //异步获取按照id查询到的商品
  async getOrderDetail({
    commit
  }, param) {
    // 发送异步ajax请求
    console.log("订单详情 的id");
    console.log(param);
    const result = await reqOrderDetail(param);
    // 提交一个mutation
    console.log("----------goodsInfo -----------");
    console.log(result.data);
    if (result.resultCode === "SUCCESS") {
      const orderInfo = result.data;
      commit(RECEIVE_orderInfo, {
        orderInfo
      });
    }
  },
  // 异步获取按照关键字搜索到的商品列表
  async searchGoods({
    commit
  }, keyword) {
    const result = await reqSearchShops(keyword);
    console.log(result);
    if (result.resultCode === "SUCCESS") {
      const searchGoods = result.data.list;
      commit(RECEIVE_searchGoods, {
        searchGoods
      });
    }
  },
  //获取所有订单
  async getOrder({ commit }, param) {
    console.log(param.userId)
    const result = await reqOrder(param);
    console.log(result.data.list[0].orderStatus);
    if (result.resultCode === "SUCCESS") {
      const order = result.data.list;
      commit(RECEIVE_order, {order});
    }
  },
  // 异步获取店铺信息
  async getStoreInfo({commit}, storeId) {
    console.log("异步获取店铺信息"+storeId)
    const result = await reqStoreInfo(storeId);
    if (result.resultCode === "SUCCESS") {
      const storeInfo = result.data;
      console.log(storeInfo)
      commit(RECEIVE_storeInfo, {storeInfo });
    }
  },

  // 异步获取店铺商品
  async getStoreGoods({commit}, storeId) {
    const result = await reqStoreGoods(storeId);
    if (result.resultCode === "SUCCESS") {
      const storeGoods = result.data;
      console.log("获取的店铺商品：")
      commit(RECEIVE_storeGoods, { storeGoods });
    }
  },
  
  //修改用户信息{nickname,phone,acceptAddress,email,city,userId}
  async infoEdit({
    commit
  }, params) {
    console.log("params----------------------------")
    let nickname = params.nickname,
      phone = params.phone,
      acceptAddress = params.acceptAddress,
      email = params.email,
      city = params.city,
      userId = params.userId
    const result = await infoEdit({
      nickname,
      phone,
      acceptAddress,
      email,
      city
    }, userId);
    if (result.resultCode === "SUCCESS") {
      const userinfo = result.data;
      Toast("修改成功")
      commit(EDIT_userinfo, {
        userinfo
      });
    } else {
      console.log(result.resultCode)
    }
  },
  // 创建店铺
  async createStores({commit }, param) {
    let userId = param.get("userId"),
      storeIntroduction = param.get("storeIntroduction"),
      storeName = param.get("userId")
    const result = await createStore({
      storeName,
      storeIntroduction
    }, userId); // 发送ajax请求密码登录
    if (result.resultCode === "SUCCESS") {
      const store = result.data
      commit(CREATE_store, { store});
      Toast("店铺创建成功")
    } else {
      console.log("错了");
    }
  },
  // 添加商品
  // addGoods({ commit}, param) {
  //   let config = {
  //     headers: {
  //       'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata
  //     }
  //   }
  //   axios.post(`${BASE_URL}/store/insertGood?storeId=2`, param, config).then((res) => {
  //     Toast("添加商品成功")
  //   })
  // },
  // bulidOrder({commit},param){
  //   axios.post(`${BASE_URL}/order/buildOrder?total_money=${param.total_money}&goodsIds=${param.goodsIds}&shoppingCounts=${param.shoppingCounts}&userId=${param.userId }`).then((res) => {
  //     Toast("订单创建成功")
  //   })
  // },
  // 异步获取用户信息 this.$route.query.id
  async getUserInfo({
    commit
  }, param) {
    console.log("this.$route.query.id 按照id查询用户 param=");
    console.log(param);
    const result = await reqUserInfo(param);
    if (result.resultCode === "SUCCESS") {
      const userInfo = result.data;
      commit(RECEIVE_userInfo, {
        userInfo
      });
    }
  },
 
  // 同步记录用户信息,如果手里有，就是同步的，没有就是异步的
  recordUser({
    commit
  }, userInfo) {
    commit(RECEIVE_userInfo, {
      userInfo
    });
  },
  //清空购物车
  clearCart({
    commit
  }) {
    commit(CLEAR_CART);
  },
  //单个删除购物车物品
  async del({commit, userId,shopCartId }) {
    const result = await this.del({userId,shopCartId});
    if (result.resultCode === "SUCCESS") {
      const shopCart = result.data;
      console.log("购物车信息" + shopCart);
      commit(RECEIVE_shopCart, { shopCart });
    }
  },
  
 // 异步获取购物车信息
  async getShopCart({ commit}, param) {
    const userId =localStorage.getItem('userId')
    const result = await reqShopCart(userId);
    if (result.resultCode === "SUCCESS") {
      const shopCart = result.data;
      commit(RECEIVE_shopCart, {  shopCart  });

    }
  },
   //增加减少数量
  async  updateFoodCount({commit}, {isAdd,food}) {
    if (isAdd) {   
        commit(INCREMENT_foodCount, {food }); //increment
    } else {
      //减少
        commit(DECREMENT_foodCount, {food}); //decrement
     }
    },
 

  //删除商品
  removeGood({
    commit
  }, params) {
    setTimeout(() => {
      let result = 'ok'
      if (result == 'ok') {
        commit('remove', params)
      }
    })
  },

};
