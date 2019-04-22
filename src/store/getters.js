/*
针对数据的计算属性
*/
export default {
	totalCount(state){
		console.log(state.shopCart)
		return state.shopCart.reduce((preTotal,food) => {
			return preTotal + food.count
		},0)
	},
	totalPrice(state){
		return state.shopCart.reduce((preTotal,food) => {
			return preTotal + food.count * food.price
		},0)
	},
	goodRateCount(state){
		return state.shopRatings.reduce((preTotal,rating) => {
			return preTotal + (rating.rateType?0:1)
		},0)
	}
}