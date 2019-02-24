/*
包含n个mutation的type名称常量
 */
export const RECEIVE_goods = 'receive_goods' // 接收商品数组

// 接收按照id搜索到的商品
export const RECEIVE_goodsInfo  = 'receive_goodsInfo ' 
//接收按照关键字搜索到的商品列表
export const RECEIVE_searchGoods='receive_searchGoods'
 //查看店铺信息
export const RECEIVE_storeInfo='receive_storeInfo'
//创建店铺
export const CREATE_store='create_store'

//接收获取到的店铺商品列表
export const RECEIVE_storeGoods='receive_storeGoods'

//购物车部分
export const RECEIVE_shopCart = 'receive_shopCart' // 接收购物车信息
export const INCREMENT_foodCount = 'increment_foodCount' // 增加food中的count
export const DECREMENT_foodCount = 'decrement_foodCount' // 减少food中的count
export const CLEAR_CART='clear_cart'//清空购物车


//用户信息
export const RECEIVE_userInfo = 'receive_userInfo' // 接收用户信息
//修改用户信息EDIT_userinfo
export const EDIT_userinfo = 'edit_userinfo'

//订单详情
export const RECEIVE_orderInfo= 'receive_orderInfo'
 

export const ADD_ITEM = 'ADD_ITEM'  //购物车

export const RESET_userInfo = 'reset_userInfo' // 重置用户信息

export const RECEIVE_order = 'receive_order' //接收订单信息




