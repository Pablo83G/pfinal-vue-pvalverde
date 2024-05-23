<template>
  <v-footer class="footer bg-surface-variant">
    <v-col class="text-center">
      <v-row align="center" justify="center">
        <v-icon class="mx-2" aria-hidden="false">mdi-facebook</v-icon>
        <v-icon class="mx-2" aria-hidden="false">mdi-twitter</v-icon>
        <v-icon class="mx-2" aria-hidden="false">mdi-instagram</v-icon>
        <v-icon class="mx-2" aria-hidden="false">mdi-linkedin</v-icon>
      </v-row>
      <v-row align="center" justify="center">
        <h6 class="derechos-de-autor mt-2">
          Creado por Pablo Valverde {{ new Date().getFullYear() }} &#169;
        </h6>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
  min-height: 70px;
  background-color: #026FC1;
  text-align: center;
  color: white;
}

.derechos-de-autor {
  font-size: 15px;
}
</style>