/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
//const BASE_URL = 'http://192.168.43.178:10012'
const BASE_URL = '/api'
 export default  {
    ImgUrl:"http://192.168.137.1:10012"
}
// 2、获取所有商品
//export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
export const reqAllFoods = () => ajax(BASE_URL+'/goods/')
//根据goodsId搜索商品
export const reqGoodsInfo = (goodsId) => ajax(`${BASE_URL}/goods/selectGoodsById?goodsId=${goodsId}`)
//搜索商品  根据关键字搜索商品
export const reqSearchShops = (keyword) => ajax(`${BASE_URL}/goods/searchGoods?search=${keyword}`)
//按分类搜索商品
export const reqSearchType = (keyword) => ajax(`${BASE_URL}/goods/searchType?type=${keyword}`)


  
reqOrderDetail
export const reqOrderDetail=(param)=>ajax(`${BASE_URL}/order/seeDetails?orderId=${param.orderId}&userId=${param.userId}`)

//查看店铺信息
export const reqStoreInfo = (storeId) => ajax(`${BASE_URL}/store/selectStore?storeId=${storeId}`)
//查看店铺商品
export const reqStoreGoods = (storeId) => ajax(`${BASE_URL}/store/selectGoods?storeId=${storeId}`)
//添加店铺
export const createStore = ({storeName,storeIntroduction},userId) => ajax(`${BASE_URL}/store/createStore?userId=${userId}`,{storeName,storeIntroduction},'POST')


// 9、根据会话获取用户信息 /user/selectUserById?userId=2
export const reqUserInfo = (userId) => ajax(`${BASE_URL}/user/selectUserById?userId=${userId}`)
//修改用户信息
export const infoEdit = ({nickname,phone,acceptAddress,email,city},userId) => ajax(`${BASE_URL}/user/updateUser?userId=${userId}`,{nickname,phone,acceptAddress,email,city}, 'POST')
// 6、用户名密码登陆
// export const reqLogin = ({phone,password}) => ajax(BASE_URL+'/login', {phone,password}, 'POST')
export const reqLogin = ({phone,password}) => ajax(BASE_URL+'/login',{phone,password}, 'POST')
// 6、用户名密码手机号注册
export const reqRegist = ({username, password, phone}) => ajax(BASE_URL+'/resister', {username, password, phone}, 'POST')

//验证手机号是否存在
export const checkExsisPhone = (phone) => ajax(BASE_URL+`/checkPhone?phone=${phone}`)

//验证用户名是否存在 
export const checkExsis = (userName) => ajax(BASE_URL+`/checkUserName?userName=${userName}`)

// 10、用户登出
// export const reqLogout = () => ajax(BASE_URL+'/logout')


//添加商品/store/insertGood
 export const addGood = ({name,money,inventory,type,specification,file},storeId) => ajax(`${BASE_URL}/store/insertGood?storeId=${storeId}`,{name,money,inventory,type,specification,file}, 'POST')

 //获取购物车信息
 export const reqShopCart = (userId) => ajax(`${BASE_URL}/shopCart/find?userId=${userId}`)
 //改变购物车信息
export const changeCar= ({goodsId,count,userId}) => ajax(`${BASE_URL}/shopCart/add`,{goodsId,count,userId},'POST')


 //查看订单
 export const reqOrder = (param) => ajax(`${BASE_URL}/order/seeOrder?status=${param.status}&userId=${param.userId}`)
//创建订单
export const buildOrders=(param)=>ajax(`${BASE_URL}/order/buildOrder?total_money=${param.total_money}&goodsIds=${param.goodsIds}&shoppingCounts=${param.shoppingCounts}&userId=${param.userId }`,'POST')

 //提交支付账单
 export const  paidOrder = (param) => ajax(BASE_URL+'/order/ali',param, 'POST')
 // 6、用户名密码手机号注册

