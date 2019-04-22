import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
/*
import Msite from '@/pages/Msite/Msite.vue'
import Search from '@/pages/Search/Search.vue'
import Order from '@/pages/Order/Order.vue'
import Profile from '@/pages/Profile/Profile.vue'
*/
//路由组件懒加载
const Msite = () => import('@/pages/Msite/Msite.vue')
const Search = () => import('@/pages/Search/Search.vue')
const Order = () => import('@/pages/Order/Order.vue')
const Profile = () => import('@/pages/Profile/Profile.vue')
import Login from '@/pages/Login/Login.vue'
import Personal from '@/pages/Personal/Personal.vue'
import Shop from '@/pages/Shop/Shop.vue'
import ShopGoods from '@/pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRating from '@/pages/Shop/ShopRating/ShopRating.vue'
import ShopInfo from '@/pages/Shop/ShopInfo/ShopInfo.vue'
export default new Router({
	routes:[
		{
			path:'/',
			name:'Msite',
			component: Msite,
			meta:{
				showFoot:true
			}
		},
		{
			path:'/search',
			name:'Search',
			component: Search,
			meta:{
				showFoot:true
			}
		},
		{
			path:'/order',
			name:'Order',
			component: Order,
			meta:{
				showFoot:true
			}
		},
		{
			path:'/profile',
			name:'Profile',
			component: Profile,
			meta:{
				showFoot:true
			}
		},
		{
			path:'/login',
			name:'Login',
			component: Login
		},
		{
			path:'/personal',
			name:'Personal',
			component: Personal
		},
		{
			path:'/shop',
			name:'Shop',
			component: Shop,
			children:[{
				path:'/shop/shopgoods',
				name:'ShopGoods',
				component: ShopGoods	
			},{
				path:'/shop/shoprating',
				name:'ShopRating',
				component: ShopRating	
			},{
				path:'/shop/shopinfo',
				name:'ShopInfo',
				component: ShopInfo	
			},{
				path:'',
				name:'ShopGoods',
				component: ShopGoods	
			}]
		}

	]
})