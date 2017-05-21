const config = require('config/client.config.js')
const port = process.env.PORT || config.port
import request from 'superagent'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const ClassModule = {
  state: {
    list: null,
    item: null
  },
  mutations:{
    "Class/SET_LIST":function(state,data){
      state.list = data
    },
    "Class/SET_ITEM":function(state,data){
      state.item = data
    }
  },
  actions:{
    "Class/GET_LIST":function({ commit,state }){
      if(state.list && state.list.length){
        return commit('Class/SET_LIST', state.list)
      }else{
        return new Promise((resolve, reject) => {
          request.get('http://localhost:'+port+'/api/class').then(function (res) {
            commit('Class/SET_LIST', res.body.list)
            resolve()
          }, function (err) {
            reject(err)
          })
        })
      }
    },
    "Class/GET_ITEM":function({ commit,state },id){
      if(state.list){
        var target = state.list.filter(function(item){
          return item.id == id
        })
        if(target.length){
          return commit('Class/SET_ITEM', target[0])
        }
      }
      return new Promise((resolve, reject) => {
        request.get('http://localhost:'+port+'/api/class/'+id).then((res) => {
          commit('Class/SET_ITEM', res.body.item)
          resolve()
        }, function (err) {
          reject(err)
        })
      })
    }
  }
}
const store = new Vuex.Store({
  modules: {
    class: ClassModule,
  }
})
export default store

