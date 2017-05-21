import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const WelcomeModule = {
  state: {
    msg: 'Welcome to Your Vue.js App'
  }
}
const EssentialModule = {
  state: {
    title: 'Essential Links',
    links:[
      {
        text:'Core Docs',
        href:'https://vuejs.org',
        target:'_blank'
      },
      {
        text:'Forum',
        href:'https://forum.vuejs.org',
        target:'_blank'
      },
      {
        text:'Gitter Chat',
        href:'https://twitter.com/vuejs',
        target:'_blank'
      },
      {
        text:'Twitter',
        href:'https://vuejs.org',
        target:'_blank'
      },
    ]
  }
}
const EcosystemModule = {
  state: {
    title: 'Ecosystem',
    links:[
      {
        text:'vue-router',
        href:'http://router.vuejs.org/',
        target:'_blank'
      },
      {
        text:'vuex',
        href:'http://vuex.vuejs.org/',
        target:'_blank'
      },
      {
        text:'vue-loader',
        href:'http://vue-loader.vuejs.org/',
        target:'_blank'
      },
      {
        text:'awesome-vue',
        href:'https://github.com/vuejs/awesome-vue',
        target:'_blank'
      },
    ]
  }
}

const store = new Vuex.Store({
  strict: true,
  modules: {
    welcome: WelcomeModule,
    essential: EssentialModule,
    ecosystem: EcosystemModule,
  }
})
export default store

