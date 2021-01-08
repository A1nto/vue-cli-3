import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

const Home = resolve => require.ensure([], () => resolve(require('@/views/Home')), 'home');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true,
      title: "首页",
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      keepAlive: true,
      title: "关于",
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.auth){
    // if(!store.state.user.isLogin) {
    //   store.dispatch("user/switchUserLoginDialogVisible", true);
    // } else {
    //   next();
    // }
  } 
  next();
})

window.routes = {};
router.afterEach((to, from) => {
  window.routes[from.name] = from.fullPath;

})

export default router
