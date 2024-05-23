<template>
  <v-app id="inspire" style="background-color: rgb(199, 199, 230);">
    <v-navigation-drawer style="background-color: #026FC1;" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 texto-blanco">
            Empleados y Proyectos
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon style="color: rgb(255, 255, 255);">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="texto-blanco">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app style="background-color: #026FC1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="color: rgb(255, 255, 255);">Empleados y Proyectos</v-toolbar-title>
    </v-app-bar>

    <v-main style="background-color: rgb(199, 199, 230);">
      <router-view />
    </v-main>

    <FooterComponent />
  </v-app>
</template>

<script>
import FooterComponent from './components/FooterComponent.vue';

export default {
  components: {
    FooterComponent,
  },
  data: () => ({
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'Empleados', icon: 'mdi-account-multiple', to: '/empleados' },
      { title: 'Proyectos', icon: 'mdi-folder', to: '/proyectos' },
      { title: 'Asignación', icon: 'mdi-account-multiple-plus', to: '/asignacion' },
    ],
  }),
}
</script>

<style>
.texto-oscuro {
  color: rgb(37, 36, 36);
}

.texto-blanco {
  color: white;
}

body, html, #inspire {
  margin: 0;
  padding: 0;
  height: 100%;
}

v-app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>