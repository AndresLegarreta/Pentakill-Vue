import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/AppLoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AppRegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    children: [
      { 
        path: 'ligaspath',
        name: 'ligas',
        component: () => import(/* webpackChunkName: "about" */ '../views/LigasView.vue')
      },
      { 
        path: 'partidospath',
        name: 'partidos',
        component: () => import(/* webpackChunkName: "about" */ '../views/PartidosView.vue'),
      },
      { 
        path: 'listadoligas',
        name: 'listaligas',  
        component: () => import(/* webpackChunkName: "about" */ '../views/ListLigasView.vue')
      },
      {
        path: 'listadopartidos',
        name: 'listapartidos',  
        component: () => import(/* webpackChunkName: "about" */ '../views/ListPartidosView.vue')
      },
      {
        path: 'championpath',
        name: 'champion',  
        component: () => import(/* webpackChunkName: "about" */ '../views/ChampionView.vue')
      },
      {
        path: 'listadochampion',
        name: 'listachampion',  
        component: () => import(/* webpackChunkName: "about" */ '../views/ListChampionView.vue')
      },    
    ]
  },
  
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
