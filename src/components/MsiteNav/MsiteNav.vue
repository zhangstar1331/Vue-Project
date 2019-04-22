<template>
	<nav class="msite_nav">
	  <div class="swiper-container">
	    <div class="swiper-wrapper" v-if="category.length>0">
	      <div class="swiper-slide" v-for="(categorys,index) in categoryArr" :key="index">
	        <a href="javascript:" class="link_to_food"  v-for="(category,index) in categorys" :key="index">
	          <div class="food_container">
	            <img :src="baseImageUrl + category.image_url">
	          </div>
	          <span>{{category.title}}</span>
	        </a>
	      </div>
	    </div>
	    <img src="./images/msite_back.svg" alt="" v-else>
	    <!-- Add Pagination -->
	    <div class="swiper-pagination"></div>
	  </div>
	</nav>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import {mapState} from 'vuex'
export default{
	data(){
		return {
			baseImageUrl:'https://fuss10.elemecdn.com'
		}
	},
	mounted(){
		this.$store.dispatch('getCategory') 
	},
	/*
	updated(){
		new Swiper('.swiper-container',{
		    loop: true, // 循环模式选项
		    // 如果需要分页器
		    pagination: {
		        el: '.swiper-pagination',
		    }
	    })
	},*/
	watch:{
		category(val){
			this.$nextTick(()=>{//this.$nextTick()将回调延迟到下次DOM更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
				new Swiper('.swiper-container',{
				    loop: true, // 循环模式选项
				    // 如果需要分页器
				    pagination: {
				        el: '.swiper-pagination',
				    }
		    	})
			})
		}
	},
	computed:{
		...mapState(['category']),
		categoryArr(){
			const {category} = this;
			const arr = [];
			let minArr = [];
			category.forEach((c) => {
				if(minArr.length === 8){
					minArr = []
				}
				if(minArr.length === 0){
					arr.push(minArr)
				}
				minArr.push(c)
			})
			return arr
		}
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content center
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
</style>