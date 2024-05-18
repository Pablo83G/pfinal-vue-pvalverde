import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmpleadosView from '../views/EmpleadosView.vue'
import ProyectosView from '../views/ProyectosView.vue'
import AsignacionEmpleadoProyecto from '../views/AsignacionEmpleadoProyecto.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: EmpleadosView 
  },
  {
    path: '/proyectos',
    name: 'proyectos',
    component: ProyectosView 
  },
  {
    path: '/asignacion',
    name: 'asignacion',
    component: AsignacionEmpleadoProyecto 
  },

]

const router = new VueRouter({
  routes
})

export default router
