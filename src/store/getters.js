/*
包含多个基于state的getter计算属性的对象
 */
export default {

  totalCount (state) { //总数量
    return state.shopCart.reduce((preTotal, food) => preTotal + food.goodsCount , 0)
  },
 
  totalPrice (state) {//总价格
    return state.shopCart.reduce((preTotal, food) => preTotal + food.goodsCount*food.money , 0)
  },
}