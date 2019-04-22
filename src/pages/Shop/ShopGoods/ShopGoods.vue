<template>
	<div>
		<div class="goods">
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li class="menu-item" :class="{current:index===currentIndex}" v-for="(good,index) in shopGoods" :key="index" @click.prevent="selectMenu(index)">
						<span class="text bottom-border-1px">
							<img class="icon" :src="good.icon" v-if="good.icon">
							{{good.name}}
						</span>
					</li>
				</ul>
			</div>
			<div class="foods-wrapper" ref="foodsWrapper">
				<ul ref="foodsUl">
					<li class="food-list-hook" v-for="(good,index) in shopGoods" :key="index">
						<h1 class="title">{{good.name}}</h1>
						<ul>
							<li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="showFood(food)">
								<div class="icon">
									<img width="57" height="57" v-lazy="food.icon">
								</div>
								<div class="content">
									<h2 class="name">{{food.name}}</h2>
									<p class="desc">{{food.description}}</p>
									<div class="extra">
										<span class="count">月售 {{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}%</span>
									</div>
									<div class="price">
										<span class="now">￥{{food.price}}</span>
									</div>
									<div class="cartcontrol-wrapper">
										<CartControl :food="food"/>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
      <Food :food="food" ref="food"/>
      <ShopCart/>
		</div>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import Food from '../../../components/Food/Food.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
	export default {
    data(){
      return {
        scrollY:'', //记录右侧当前滑动所在位置的Y值
        tops:[], //记录右侧每一个li所对应的Y值，用于位置下标计算
        food:{}
      }
    },
		mounted(){
			this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{//数据请求完成，列表渲染之后再去进行滑动配置
          this._initScroll()
          this._initTops()
        })
			})
		},
		computed:{
			...mapState(['shopGoods']),
      //计算当前滑动位置的分类的下标
      currentIndex(){
        const {scrollY,tops} = this;
        const index = tops.findIndex((top,index) => {//当前值和下标
          //返回一个布尔值
          return scrollY >= top && scrollY < tops[index + 1]
        }) 
        return index;
      }
		},
    methods:{
      //滚动初始化
      _initScroll(){
        //应用滑动组件，实现滑动
        this.scrollMenu = new BScroll('.menu-wrapper',{
          click:true
        })
        this.scrollFoods = new BScroll('.foods-wrapper',{
          probeType:2,  //监听不了惯性滑动，要想监听改成3
          click:true
        })
        //触发滑动实时监听
        this.scrollFoods.on('scroll',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
        //监听滑动停止时所处的位置
        this.scrollFoods.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
      },
      //tops收集初始化,记录右侧每一个li所对应的Y值
      _initTops(){
        const tops = [];
        let top = 0;
        tops.push(top);
        //获取li
        const lis = this.$refs.foodsUl.children;
        //将伪数组转化为真数组，遍历拿到每一个li对应的Y值
        Array.prototype.slice.call(lis).forEach((li)=>{
          top += li.clientHeight;
          tops.push(top)
        })
        this.tops = tops;
      },
      //点击左侧菜单,右侧滑动到指定位置
      selectMenu(index){ 
        //拿到当前点击分类右侧对应的top值
        const topY = this.tops[index];
        //点击的时候，右侧分类样式立即改变
        this.scrollY = topY;
        //右侧滑动到指定位置
        this.scrollFoods.scrollTo(0,-topY,300)
      },
      showFood(food){
        this.food = food;
        this.$refs.food.toggleShow()
      }
    },
    components:{
      CartControl,
      Food,
      ShopCart
    }
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>