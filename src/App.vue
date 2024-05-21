<template>
  <v-app id="inspire">
    <v-navigation-drawer style="background-color: rgb(106, 106, 197);" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 texto-blanco">
            Empleados y Proyectos
          </v-list-item-title>
          <v-list-item-subtitle class="texto-blanco">
            Práctica final - Pablo Valverde
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon style="color: rgb(37, 36, 36);">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="texto-oscuro">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app style="background-color: rgb(106, 106, 197)">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="color: rgb(225, 222, 230);">Empleados y Proyectos</v-toolbar-title>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    
      <v-footer class="footer d-flex justify-center mb-6 bg-surface-variant">

        <v-col>
          <v-icon class="mx-2" aria-hidden="false">
            mdi-facebook
          </v-icon >
          <v-icon class="mx-2" aria-hidden="false">
            mdi-twitter
          </v-icon>
          <v-icon class="mx-2" aria-hidden="false">
            mdi-instagram
          </v-icon>
          <v-icon class="mx-2" aria-hidden="false">
            mdi-linkedin
          </v-icon>

          <div class="derechos-de-autor">
            Creado por Pablo Valverde {{ new Date().getFullYear() }} &#169;
          </div>

        </v-col>


      </v-footer>
  
  </v-app>
</template>



<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'Home', icon: 'mdi-home', to: '/' },
      { title: 'Empleados', icon: 'mdi-account-multiple', to: '/empleados' },
      { title: 'Proyectos', icon: 'mdi-folder', to: '/proyectos' },
      { title: 'Asignación', icon: 'mdi-help-box', to: '/asignacion' },
    ],

  }),
}
</script>

<style>
.texto-oscuro {
  color: rgb(37, 36, 36)
}

.tamanho-texto {
  font-size: medium;
}

.texto-blanco {
  color: white
}

.derechos-de-autor {
  font-size: 15px;
  color: #aeaeae;
  padding: 20px;
}

/* Pie de pagina (footer) */

.footer {
  min-height: 70px !important;
  background-color: rgb(106, 106, 197) !important;
  text-align: center !important;
}
</style>