<template>
  <v-data-table :headers="headers" :items="empleados" sort-by="calories" class=" elevation-1">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>CONSULTA DE EMPLEADOS</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              ALTA EMPLEADO
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nif" label="NIF"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.primer_apellido" label="Primer apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.segundo_apellido" label="Segundo apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.telefono_uno" label="Telefono 1"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.telefono_dos" label="Telefono 2"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fecha_nacimiento" label="Fecha de nacimiento"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fecha_alta" label="Fecha de alta"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.estado_civil" label="Estado civil"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.servicio_militar" label="Servicio militar"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                CANCELAR
              </v-btn>
              <v-btn color="blue darken-1" text @click="save">
                ACEPTAR
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="700px">
          <v-card>
            <v-card-title class="text-h5">¿Seguro que quieres dar de baja a este empleado?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="deleteItem(item)">
        mdi-close-box-outline
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    // rules: {
    //   required: value => !!value || 'Requerido.',
    //   nif: value => /^[0-9]{8}[A-Z]$/.test(value) || 'NIF inválido.',
    //   phone: value => /^[0-9]{9}$/.test(value) || 'Teléfono inválido.',
    //   email: value => /.+@.+\..+/.test(value) || 'Email inválido.'
    // },
    headers: [
      { text: 'NIF', value: 'nif', class: "indigo lighten-2"},
      { text: 'Nombre', value: 'nombre' },
      { text: 'Primer apellido', value: 'primer_apellido' },
      { text: 'Segundo apellido', value: 'segundo_apellido' },
      { text: 'Telefono 1 contacto', value: 'telefono_uno' },
      { text: 'Email', value: 'email' },
      { text: 'Fecha de nacimiento', value: 'fecha_nacimiento' },
      { text: 'Estado civil', value: 'estado_civil' },
      { text: 'Servicio militar', value: 'servicio_militar' },
      { text: 'Dar de baja', value: 'actions', sortable: false },
    ],
    empleados: [],
    editedIndex: -1,
    editedItem: {
      nif: '',
      nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      telefono_uno: '',
      telefono_dos: '',
      Email: '',
      fecha_nacimiento: '',
      fecha_alta: '',
      fecha_baja: null,
      estado_civil: '',
      servicio_militar: ''
    },
    defaultItem: {
      nif: '',
      nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      telefono_uno: '',
      telefono_dos: '',
      Email: '',
      fecha_nacimiento: '',
      fecha_alta: '',
      fecha_baja: null,
      estado_civil: '',
      servicio_militar: ''
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Alta epmleado' : 'Editar Empleado'
    },

  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  mounted() {
    this.getEmpleados()
    },

  methods: {
    initialize() {
      this.empleados = [

      ]
    },

    async getEmpleados() {
      try {
        const response = await axios.get('http://localhost:8080/empleados/getEmpleados')
        this.empleados = response.data
        console.log('Esta es la lista de empleados ' + this.empleados)
      } catch (error) {
        console.log(error)
      }
    },

    // async altaEmpleado(){
    //   try {
    //     const response = await axios.post('http://localhost:8080/empleados/createEmpleado', this.editItem)
    //     const respJson = await response.json()
    //     this.empleados = response.data
    //     console.log('Este es el nuevo empleado ' + respJson)
    //   } catch (error) {

    //   }
    // },

    editItem(item) {
      // indexOf() retorna el primer índice en el que se puede encontrar un elemento dado en el 
      //array, ó retorna -1 si el elemento no esta presente
      this.editedIndex = this.empleados.indexOf(item)
      //Object.assign() copia todas las propiedades enumerables de uno o más objetos fuente a un objeto destino. Devuelve el objeto destino.
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.empleados.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        await axios.put(`http://localhost:8080/empleados/udpdateEmpleado/${this.editedItem.id_empleado}`)
        this.empleados.splice(this.editedIndex, 1)
        // Swal.fire({
        //   icon: 'success',
        //   title: 'Se ha dado de baja al empleado con éxito',
        //   showConfirmButton: false,
        //   timer: 1500
        // })
      } catch (error) {
        console.log('Error al dar de baja al empleado', error)
      }
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      try {
          //insertar empleado
          const strJson = JSON.stringify(this.editedItem)
          const response = await axios.post('http://localhost:8080/empleados/createEmpleado', strJson, 
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          this.empleados.push(response.data)
        
        this.close()
      }catch{
        console.error('Error al guardar: ', error)
      }
    },
  }
}
</script>

<style>
.tabla-empleados{
  background-color: blue;
}

</style>