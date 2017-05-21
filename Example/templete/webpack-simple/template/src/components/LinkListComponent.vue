<template>
  <div>
    <h1>\{{ title }}</h1>
    <ul>
      <li v-for="link in links">
        <a :href="link.href" :target="link.target">
          \{{ link.text }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'link-list',
  props:['linkType'],
  computed: {
    title() {
      return this.state[this.linkType].title
    },
    links() {
      return this.state[this.linkType].links
    },
    ...mapState({
      state: state => state
    })
  }
}
</script>