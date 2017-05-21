<template>
  <h1>\{{ msg }}</h1>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'welcome',
  computed: {
    ...mapState({
      msg: state => state.welcome.msg
    })
  }
}
</script>

<style scoped>
  h1 {
    font-weight: bolder;
  }
</style>