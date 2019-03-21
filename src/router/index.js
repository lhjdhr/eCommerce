/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


const MSite = () => import('../pages/MSite/MSite.vue')
const Store = () => import('../pages/Store/Store.vue')
const Search = () => import('../pages/Search/Search.vue')
const Cart= () => import('../pages/Cart/Cart.vue')
const Profile = () => import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'

import StoreGoods from '../pages/Store/StoreGoods/StoreGoods.vue'
import StoreManage from '../pages/Store/StoreManage/StoreManage.vue'
import StoreInfo from '../pages/Store/StoreInfo/StoreInfo.vue'
import GoodsDetails from '../pages/Details/GoodsDetails.vue'
import AddGoods from '../pages/Store/AddGoods/AddGoods.vue'
import UserInfo from '../pages/Profile/UserInfo.vue'
import CreateStore from '../pages/CreateStore/CreateStore.vue'
import Order from '../pages/Order/Order.vue'
import OrderList from '../pages/Order/OrderList/OrderList.vue'

import OrderDetails from '../pages/Order/orderDetails/orderDetails.vue'
import ConfirmOrder from '../pages/ConfirmOrder/ConfirmOrder.vue'

import PlacingOrder from '../pages/PlacingOrder/PlacingOrder.vue'

// 声明使用插件
Vue.use(VueRouter)

export default new VueRouter({
  // 所有路由
  routes: [
    {
      path: '/msite',
      component: MSite, // 返回路由组件的函数, 只有执行此函数才会加载路由组件, 这个函数在请求对应的路由路径时才会执行
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/placingOrder',
      component: PlacingOrder
    },
    {
      path: '/orderDetails',
      component: OrderDetails
    },
    {
      path: '/cart',
      component: Cart,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/confirmOrder',
      component: ConfirmOrder,   
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/userInfoEdit',
      component: UserInfo,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/addGoods',
      component: AddGoods,
    },
     {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/store',
      component: Store,
      
      children: [
        {
          path: '/store/goods',
          component: StoreGoods,
          meta: {
            showFooter: true
          },
        },
        {
          path: '/store/manage',
          component: StoreManage,
          meta: {
            showFooter: true
          },
        },
        {
          path: '/store/info',
          component: StoreInfo,
          meta: {
            showFooter: true
          },
        },
       
        {
          path: '',
          redirect: '/store/goods'
        },
      ]
    },
    {
      path: '/createStore',
      component: CreateStore
    },
    {
      path: '/goodsDetails',
      component: GoodsDetails
    },
    {
      path: '/order',
      component: Order,
      children: [
        {
          path: '/order/all',
          component: OrderList,
          meta: {
            showFooter: true
          },
        },
        {
          path: '/order/paid',
          component: OrderList,
          meta: {
            showFooter: true
          },
        },
        {
          path: '/order/received',
          component: OrderList,
          meta: {
            showFooter: true
          },
        },     
        {
          path: '',
          redirect: '/order/all'
        },
      ]
    },
  ]
})