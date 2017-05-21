<template>
  <div id="app" v-cloak>
    <header>
      <h1>Flycan 飛肯設計學苑</h1>
      <div> 
        <router-link v-for="item in menu"
          :to="{ name: item.name }"
          :key="item.name"
          exact>
          {{item.name | firstUpper}}
        </router-link>
        <router-link 
          to="/course/3"
          exact>3
        </router-link>
        <router-link 
          to="/course/5"
          exact>5
        </router-link>
      </div> 
    </header>
    <transition :name="transitionName" mode="out-in" appear>
      <router-view :key="$route.fullPath"></router-view>
    </transition> 
  </div>
</template>
<style src="./style/site.css"></style>
<style>
  [v-cloak]{
    display: none;
  }
</style>
<script>
export default {
  name: 'app',
  metaInfo: {
    title: 'Flycan',
    titleTemplate: null,
    meta: [{
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=utf-8'
    }, {
      'http-equiv': 'Content-language',
      content: 'zh-tw'
    }, {
      name: 'viewport',
      content: 'initial-scale=1, maximum-scale=1, user-scalable=no'
    }, {
      name: 'keywords',
      content: 'vue.js, vue-router, vuex, vue-meta, webpack 2, server-render'
    }]
  },
  data(){
    return {
      transitionName:'slide-up'
    }
  },
  computed:{
    menu:function(){
      return this.$router.options.routes.filter(function(route){
        return route.path.split('/').length > 1 && route.path.split('/').length < 3
      })
    }
  },
  methods:{
    pathDepth(path){
      return path.split('/').length
    },
    menuIndex(name){
      return this.menu.indexOf(this.menu.filter(function(item){
        return item.name == name
      })[0])
    }
  },
  watch:{
    $route:function(newRoute,oldRoute){
      if(this.pathDepth(newRoute.fullPath) == this.pathDepth(oldRoute.fullPath)){
        this.transitionName = this.menuIndex(newRoute.name) < this.menuIndex(oldRoute.name) ? 'slide-right' : 'slide-left'
      }else{
        this.transitionName = this.pathDepth(newRoute.fullPath) < this.pathDepth(oldRoute.fullPath) ? 'slide-down' : 'slide-up'
      }
    }
  }
}
</script>
