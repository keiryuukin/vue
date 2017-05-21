var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    });
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

var localStore = {
  get:function(name){
    return JSON.parse(window.localStorage.getItem(name))
  },
  set:function(name,val){
    window.localStorage.setItem(name,JSON.stringify(val))

  }
}

var store = new Vuex.Store({
  strict: true,
  state: {
    todos:null,
    visibility:undefined
  },
  getters: {
    filteredTodos: function(state) {
      return filters[state.visibility](state.todos)
    },
    remaining: function(state) {
      return filters.active(state.todos).length
    },
    allDone: function(state){
      return store.getters.remaining === 0
    }
  },
  mutations:{
    init:function(state){
      state.todos = localStore.get('todos') || []
      localStore.set('todos',state.todos)
    },
    allDone: function(state,val){
      state.todos.forEach(function (todo) {
        todo.completed = val
      })
      localStore.set('todos',state.todos)
    },
    add:function(state,data){
      state.todos.push({ title: data, completed: false })
      localStore.set('todos',state.todos)
    },
    switchComplete:function(state,data){
      var filteredTodos = filters[state.visibility](state.todos)
      filteredTodos[data.index].completed = !filteredTodos[data.index].completed
      localStore.set('todos',state.todos)
    },
    updateTitle:function(state,data){
      var filteredTodos = filters[state.visibility](state.todos)
      filteredTodos[data.index].title = data.title
      localStore.set('todos',state.todos)
    },
    remove:function(state,data){
      var filteredTodos = filters[state.visibility](state.todos)
      filteredTodos.splice(data.index, 1)
      localStore.set('todos',state.todos)
    },
    removeCompleted:function(state){
      state.todos = filters.active(state.todos)
      localStore.set('todos',state.todos)
    },
    filter:function(state,data){
      state.visibility = data
    },
  }
})