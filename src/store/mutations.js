/*
直接操作数据
*/
import Vue from 'vue'
import {
	RECEIVE_ADDRESS,
	RECEIVE_CATEGORY,
	RECEIVE_SHOPS,
	RECEIVE_USERINFO,
	RECEIVE_SHOPGOODS,
	RECEIVE_SHOPRATINGS,
	RECEIVE_SHOPINFO,
	INCREMENT_CART_COUNT,
	DECREMENT_CART_COUNT,
	CLEAR_CART,
	RECEIVE_SEARCHSHOP
} from './mutation-type'
export default {
	[RECEIVE_ADDRESS](state,{address}){
		state.address = address
	},
	[RECEIVE_CATEGORY](state,{category}){
		state.category = category
	},
	[RECEIVE_SHOPS](state,{shops}){
		state.shops = shops
	},
	[RECEIVE_USERINFO](state,{userInfo}){
		state.userInfo = userInfo
	},
	[RECEIVE_SHOPGOODS](state,{shopGoods}){
		state.shopGoods = shopGoods
	},
	[RECEIVE_SHOPRATINGS](state,{shopRatings}){
		state.shopRatings = shopRatings
	},
	[RECEIVE_SHOPINFO](state,{shopInfo}){
		state.shopInfo = shopInfo
	},
	[INCREMENT_CART_COUNT](state,{food}){
		if(!food.count){
			//food.count = 1  已绑定数据直接新增属性无法绑定到页面上
			Vue.set(food,'count',1)
			state.shopCart.push(food)
		}else{
			food.count++
		}
	},
	[DECREMENT_CART_COUNT](state,{food}){
		if(food.count){
			food.count--
			if(food.count === 0){
				state.shopCart.splice(state.shopCart.indexOf(food),1)
			}
		}
	},
	[CLEAR_CART](state){
		state.shopCart.forEach((food) => {
			food.count = 0
		})
		state.shopCart = []
	},
	[RECEIVE_SEARCHSHOP](state,{searchShops}){
		state.searchShops = searchShops
	}
}