<template>
  <section class="msite">
        <!--首页头部-->
        <HeaderTop :title="address.name">
          <router-link class="header_search" slot="left" to="/search">
            <i class="iconfont icon-sousuo"></i>
          </router-link>
          <router-link class="header_login" slot="right" :to="userInfo._id?'/personal':'/login'">
            <span class="header_login_text" v-if="!userInfo._id">
              登录|注册
            </span>
            <span class="header_login_text" v-else>
              <i class="iconfont icon-person"></i>
            </span>
          </router-link>
        </HeaderTop>
        <!--首页导航-->
        <MsiteNav/>
        <!--首页附近商家-->
        <ShopList/>
      </section>
</template>

<script>
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
import ShopList from '../../components/ShopList/ShopList.vue'
import MsiteNav from '../../components/MsiteNav/MsiteNav.vue'
import {mapState} from 'vuex'
export default {
  components:{
    HeaderTop,
    ShopList,
    MsiteNav
  },
  computed:{
    ...mapState(['address','userInfo'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl'
.msite  //首页
  width 100%
</style>
