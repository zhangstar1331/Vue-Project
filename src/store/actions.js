/*
通过mutations间接操作数据
*/
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
import {
	reqAddress,
	reqCategory,
	reqShops,
	reqGetUserinfo,
	reqLogout,
	reqShopGoods,
	reqShopRatings,
	reqShopInfo,
	reqSearchShops
} from '../api'
export default {
	async getAddress({commit,state}){
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqAddress(geohash) 
		if(result.code == 0){
			const address = result.data;
			commit(RECEIVE_ADDRESS,{address})
		}
	},
	async getCategory({commit,state}){
		const result = await reqCategory() 
		if(result.code == 0){
			const category = result.data;
			commit(RECEIVE_CATEGORY,{category})
		}
	},
	async getShops({commit,state}){
		const result = await reqShops(state.latitude,state.longitude) 
		if(result.code == 0){
			const shops = result.data;
			commit(RECEIVE_SHOPS,{shops})
		}
	},
	recodeUserInfo({commit},userInfo){
		commit(RECEIVE_USERINFO,{userInfo})
	},
	async getUserInfo({commit,state}){
		const result = await reqGetUserinfo() 
		if(result.code == 0){
			const userInfo = result.data;
			commit(RECEIVE_USERINFO,{userInfo})
		}
	},
	async logout({commit}){
		const result = await reqLogout() 
		if(result.code == 0){
			const userInfo = {};
			commit(RECEIVE_USERINFO,{userInfo})
		}
	},
	async getShopGoods({commit},callback){
		const result = await reqShopGoods() 
		if(result.code == 0){
			const shopGoods = result.data;
			commit(RECEIVE_SHOPGOODS,{shopGoods});
			callback && callback()
		}
	},
	async getShopRatings({commit},callback){
		const result = await reqShopRatings() 
		if(result.code == 0){
			const shopRatings = result.data;
			commit(RECEIVE_SHOPRATINGS,{shopRatings})
			callback && callback()
		}
	},
	async getShopInfo({commit},callback){
		const result = await reqShopInfo() 
		if(result.code == 0){
			const shopInfo = result.data;
			commit(RECEIVE_SHOPINFO,{shopInfo});
			callback&&callback()
		}
	},
	updateCartCount({commit},{isAdd,food}){
		if(isAdd){
			commit(INCREMENT_CART_COUNT,{food})
		}else{
			commit(DECREMENT_CART_COUNT,{food})
		}
	},
	clearCart({commit}){
		commit(CLEAR_CART)
	},
	async getSearchShops({commit,state},searchWord,callback){
		const geohash = state.latitude + ',' + state.longitude
		const result = await reqSearchShops(geohash,searchWord) 
		if(result.code == 0){
			const searchShops = result.data;
			commit(RECEIVE_SEARCHSHOP,{searchShops});
			callback&&callback()
		}
	}
}