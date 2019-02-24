/*
包含多个基于state的getter计算属性的对象
 */
export default {

  totalCount (state) { //总数量
    return state.shopCart.reduce((preTotal, food) => preTotal + food.count , 0)
  },
 
  totalPrice (state) {//总价格
    return state.shopCart.reduce((preTotal, food) => preTotal + food.count*food.money , 0)
    // let money = 0;
    // state.shopCart.forEach(item=>{
    //   money+=item.money*item.count
    // })
    // return money
  },
}