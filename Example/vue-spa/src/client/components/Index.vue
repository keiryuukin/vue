<template>
  <div class="page">
    <h1>Index</h1>
    <div class="list" >
      <router-link v-for="item in classList"
        :to="'/course/'+item.id" :key="item.id">
        {{item.name}}
      </router-link>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  .list{
    max-width:800px;
    margin:0 auto;
    >a{
      display:block;
      width:100%;
      height:50px;
      line-height:50px;
      margin:10px
    }
  }
</style>
<script>
  import { mapState} from 'vuex'
  export default{
    name: 'Index',
    metaInfo() {
      return {
        titleTemplate: '%s - Index'
      }
    },
    preFetch(store) {
      return store.dispatch('Class/GET_LIST')
    },
    beforeMount() {
      return this.$store.dispatch('Class/GET_LIST')
    },
    computed:{
      ...mapState({
        classList:state=>state.class.list
      })
    }
  }
</script>