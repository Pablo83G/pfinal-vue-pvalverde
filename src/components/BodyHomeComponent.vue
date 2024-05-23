<template>
  <v-container style="background-color: rgb(199, 199, 230);">
    <v-row class="text-center justify-center">
      <v-col cols="12">
        <v-img :src="require('../assets/Logo_Future_Space.png')" class="my-3" contain height="50" />
      </v-col>

      <v-col cols="12" class="hero d-flex flex-column align-items-center justify-center" style="background-color: rgb(199, 199, 230);">
        <v-row class="hero-principal d-flex flex-column align-items-center justify-center">
          <v-img class="hero-imagen-perfil rounded-circle mb-4" src="../assets/fotoPablo.jpeg" alt="Foto de Pablo" />
          <h1 color="#001021">Pablo Valverde Olmos</h1>
          <h2>Proyecto final prácticas</h2>
        </v-row>
        <v-row class="hero-inferior justify-center">
          <v-col cols="12" md="8" class="mb-4 text-center">
            <h6 class="display-2 font-weight-bold mb-3" color="#001021">
              Bienvenidos a la intranet Empleados-Proyectos
            </h6>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BodyHomeComponent',
}
</script>

<style>
/* Sección Hero */

.hero {
  background-color: rgb(214, 214, 231);
  min-height: 450px;
  text-align: center;
}

.hero-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}

.hero-imagen-perfil {
  width: 200px;
  height: 200px;
}

.hero-principal h2 {
  font-size: 1.5rem;
  color: #026FC1;
}

.hero-inferior {
  width: 100%;
}
</style>