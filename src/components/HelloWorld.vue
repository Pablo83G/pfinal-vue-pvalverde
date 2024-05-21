<template>
  <v-container style="background-color: rgb(199, 199, 230);">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('../assets/Logo_Future_Space.png')" class="my-3" contain height="50" />
      </v-col>

      <v-col class="hero ">
        <v-row class="hero-principal d-flex flex-column justify-content-center align-items-center">
          <v-img class="hero-imagen-perfil rounded-circle" src="../assets/fotoPablo.jpeg" alt="Foto de Pablo" />
          <h1>Pablo Valverde Olmos</h1>
          <h2>Proyecto final prácticas</h2>
        </v-row>
        <v-row class="hero-inferior">
          <v-col class="mb-4">
            <h4 class="display-2 font-weight-bold mb-3">
              Bienvenidos a la intranet Empleados-Proyectos
            </h4>

            <p class="subheading font-weight-regular">
              For help and collaboration with other Vuetify developers,
              <br>please join our online
              <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
            </p>

          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({

  }),
}
</script>

<style>
/* Seccion Hero */

.hero {
  background-color: rgb(214, 214, 231);
  min-height: 450px;
  text-align: center;
}

.hero-principal {
  padding: 3rem;
}

.hero-imagen-perfil {
  width: 300px;
  height: 300px;
  margin: 20px 350px;

}

.hero-principal h2 {
  font-size: 1.5rem;
  color: #2c55db;
}
</style>