import Vue from 'vue'
import VueRouter from 'vue-router'
import Todo from '../views/Todo.vue'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/three',
    name: 'Canvas',

    component: () => import('../views/Three.vue')
  },
  // {
  //   path: '/threeb',
  //   name: 'Canvas',
  //
  //   component: () => import('../views/ThreeB.vue')
  // },
  {
    path: '/uldtv',
    name: 'uldTV',

    component: () => import('../views/uldTV.vue')
  },
  {
    path: '/pubsub',
    name: 'PubSub',
       component: () => import( '../views/PubSub.vue')
  },
  {
    path: '/foo',
    name: 'Foo',
      component: () => import('../views/Foo.vue')
  },
  {
    path: '/bar',
    name: 'Bar',
    component: () => import('../views/Bar.vue')
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
