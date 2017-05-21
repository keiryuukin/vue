(function(window){
  var data = {
    newTodo:"",
    editedTodo:null,
    todos:[],
    visibility:"all"
  }
  var filters = {
    all: function (todos) {
      return todos;
    },
    active: function (todos) {
      return todos.filter(function (todo) {
        return !todo.completed;
      });
    },
    completed: function (todos) {
      return todos.filter(function (todo) {
        return todo.completed;
      });
    }
  };
  var vm = new Vue({
    el:'.todoapp',
    data:data,
    computed: {
      filteredTodos: function () {
        return filters[this.visibility](this.todos);
      },
      remaining: function () {
        return filters.active(this.todos).length;
      },
      allDone: {
        get: function () {
          return this.remaining === 0;
        },
        set: function (value) {
          this.todos.forEach(function (todo) {
            todo.completed = value;
          });
        }
      }
    },
    methods: {
      pluralize: function (word, count) {
        return word + (count === 1 ? '' : 's');
      },
      addTodo: function () {
        var value = this.newTodo && this.newTodo.trim();
        if (!value) {
          return;
        }
        this.todos.push({ title: value, completed: false });
        this.newTodo = '';
      },
      removeTodo: function (todo) {
        var index = this.todos.indexOf(todo);
        this.todos.splice(index, 1);
      },
      editTodo: function (todo) {
        this.beforeEditCache = todo.title;
        this.editedTodo = todo;
      },
      doneEdit: function (todo) {
        if (!this.editedTodo) {
          return;
        }
        this.editedTodo = null;
        todo.title = todo.title.trim();
        if (!todo.title) {
          this.removeTodo(todo);
        }
      },
      cancelEdit: function (todo) {
        this.editedTodo = null;
        todo.title = this.beforeEditCache;
      },
      removeCompleted: function () {
        this.todos = filters.active(this.todos);
      }
    },
    directives: {
      todoFocus: {
        inserted:function (el) {
          el.focus();
        }
      }
    }
  })
})(window)