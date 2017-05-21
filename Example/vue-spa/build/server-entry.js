import { app, router, store } from 'client/app'
export default context => {
  router.push(context.url)
  return Promise.all(router.getMatchedComponents().map(component => {
    if (component.preFetch) {
      return component.preFetch(store,router)
    }
  })).then(() => {
    context.initialState = store.state
    context.meta = app.$meta()
    return app
  })
}

