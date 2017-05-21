<template>
  <div class="page">
    <h1>Course</h1>
    <div class="list" v-for="item in classList">
      <h2>{{item.name}}</h2>
      <router-link v-for="date in item.date"
        :to="'/course/'+item.id" :key="item.id">
        {{date}}
      </router-link>
    </div>
  </div>
</template>
<style lang="sass" scoped>
  .list{
    max-width:800px;
    margin:0 auto;
    >a{
      display:inline-block;
      height:30px;
      line-height:30px;
      margin:10px
    }
  }
</style>
<script>
  import { mapState} from 'vuex'
  export default{
    name: 'Course',
    metaInfo() {
      return {
        titleTemplate: '%s - Course'
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