import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

import routes from './routes'
import store from '../store'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  // Global route guard
  Router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters['auth/isAuthenticated']

    // Check if route requires authentication
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Login' }) // Redirect to Login page if not authenticated
    } else {
      next() // Allow access to the route if authenticated or if no authentication is required
    }
  })

  return Router
})
