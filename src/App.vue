<template>
  <div id="app">
    <router-view/>
    <FooterGuide v-if="$route.meta.showFoot"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import {getCategory} from './api/index.js'
import {mapActions} from 'vuex'
export default {
  name: 'App',
  mounted(){
    this.getAddress()
    this.getUserInfo()
    this.$store.dispatch('getShops')
  },
  methods:{
    ...mapActions(['getAddress','getUserInfo'])
  },
  components:{
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
