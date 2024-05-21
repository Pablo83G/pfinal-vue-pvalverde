<template>
    <v-container fluid>
        <v-row class="seleccionable justify-left">
            <!-- <v-spacer></v-spacer> -->
            <v-col>
                <v-select chips label="Selecciona un proyecto" :items="proyectos" item-text="descripcion" item-value="id_proyecto" variant="outlined">
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div style="margin: 0px 200px;">
                    <v-data-table :headers="headers" :items="empleados" class="elevation-1" :item-per-page="5">
                        <template v-slot:item.actions="{ item }">
                            <v-simple-checkbox v-model="item.actions"></v-simple-checkbox>
                        </template>
                    </v-data-table>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div class="text-center">
                        <v-btn class="ma-2" color="primary">
                            Acceptar
                            <v-icon color="white" icon="mdi-check-circle" size="small"></v-icon>
                        </v-btn>
                    </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>
import axios from 'axios'
export default {
    data() {
        return {
            proyectos: [],
            empleados: [],
            headers: [
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellidos', value: 'apellidos' },
                { text: 'Asignado', value: 'actions' },
            ],
            editedIndex: -1,
    editedItem: {
        nombre: '',
      apellidos: '',
    },
    defaultItem: {
      nombre: '',
      apellidos: '',
    },
        }
    },

    mounted() {
        this.getProyectos(),
        this.getEmpleados()
    },

    methods: {
        async getProyectos() {
        try {
          const response = await axios.get('http://localhost:8080/proyectos/getProyectos')
          this.proyectos = response.data
          console.log('Esta es la lista de proyectos ' + this.proyectos)
        } catch (error) {
          console.log(error)
        }
      },

      async getEmpleados() {
      try {
        const response = await axios.get('http://localhost:8080/empleados/getEmpleados')
        //Mapea el array empleados
        this.empleados = response.data.map(empleado => ({
            nombre: empleado.nombre,
            apellidos: `${empleado.primer_apellido} ${empleado.segundo_apellido}`
            //actions:
        }))
        console.log('Esta es la lista de empleados ' + this.empleados)
      } catch (error) {
        console.log("Error en el manejo de datos", error)
      }
    },


    }
    
    
}
</script>

<style>
    .seleccionable{
        display: flex;
        margin: 20px 600px 0px 40px;
        padding: 20px 10px 0px 0px;
        
    }

</style>