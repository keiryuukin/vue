<template>
  <div class="page">
    <h1>Detail</h1>
    <template  v-if="item">
      <h2>{{item.name}}</h2>
      <span v-for="d in item.date">{{d}}</span>
    </template>
  </div>
</template>
<style scoped>
  span{
    margin: 10px
  }
</style>
<script>
import { mapState } from 'vuex'

function fetchData(store,router){
  return store.dispatch('Class/GET_ITEM',store.state.route.params.id).then(() => {
    if(!store.state.class.item) router.replace({name:'course'})
  })
}

export default{
  name: 'detail',
  metaInfo() {
    return {
      titleTemplate: '%s - Detail'
    }
  },
  preFetch(store,router) {
    return fetchData(store,router)
  },
  beforeMount() {
    return fetchData(this.$store,this.$router)
  },
  computed:{
    ...mapState({
      item:state=>state.class.item
    })
  }
}
</script>