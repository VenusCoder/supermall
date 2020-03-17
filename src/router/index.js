import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import ('../views/home/Home.vue')
const TabBar = () => import ('../components/common/tabbar/TabBar.vue')
const TabBarItem = () => import ('../components/common/tabbar/TabBarItem.vue')
const Catagory = () => import ('../views/catagory/Catagory.vue')
const Cart = () => import ('../views/cart/Cart.vue')
const Profile = () => import ('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    redirect: '/'
  },
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/catagory',
    name: 'catagory',
    component: Catagory
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    name: 'detail',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
