(function(window){

  var index = {
    template: `
      <div class="page">
        <h2>首頁組件</h2>
      </div>
    `
  }
  var course = {
    template: `
      <div class="page">
        <h2>課程組件</h2>
        <router-link to="/course/1">1</router-link>
        <router-link to="/course/2">2</router-link>
        <router-link to="/course/3">3</router-link>
      </div>
    `
  }
  var detail = {
    template: `
      <div class="page">
        <h2>詳細組件</h2>
        <p>{{$route.params.id}}</p>
      </div>
    `
  }
  var contact = {
    template: `
      <div class="page">
        <h2>聯絡組件</h2>
      </div>
    `
  }

  var router = new VueRouter({
    routes :[
      { 
        name: 'index',
        path: '/',
        component: index,
      },{
        name: 'course',
        path: '/course',
        component: course
      },{
        name: 'detail',
        path: '/course/:id',
        component: detail
      },{
        name: 'contact',
        path: '/contact',
        component: contact
       },
      { path: '*', redirect: '/' }
    ]
  })

  new Vue({
    el:'#app',
    data:{
      transitionName:'slide-up',
      menu:[
        {text:'首頁',name:'index'},
        {text:'課程',name:'course'},
        {text:'聯絡',name:'contact'},
      ]
    },
    router:router,
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
  })
})(window)