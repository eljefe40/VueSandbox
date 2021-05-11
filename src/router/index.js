import Vue from 'vue'
import VueRouter from 'vue-router'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/three',
    name: 'Canvas',
    component: () => import('../views/Three.vue')
  },

  {
    path: '/pubsub',
    name: 'PubSub',
       component: () => import( '../views/PubSub.vue')
  },
  {
    path: '/pubsub2',
    name: 'PubSub2',
    component: () => import( '../views/PubSub2.vue')
  },
  {
    path: '/particles',
    name: 'Particles',
    component: () => import( '../views/Particles.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${ process.env.VUE_APP_TITLE } - ${ to.name }`
  next()
})

router.afterEach((to, from) => {
  goTo(0, { duration: 0 })
})

export default router
