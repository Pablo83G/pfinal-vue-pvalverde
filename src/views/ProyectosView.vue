<template>
    <v-data-table :headers="headers" :items="proyectos" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>CONSULTA PROYECTOS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                ALTA PROYECTO
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
                      <v-text-field v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fecha_inicio" label="Fecha de incio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.fecha_fin" label="Fecha de fin"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.lugar" label="Lugar"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.observaciones" label="Observaciones"></v-text-field>
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
          <v-dialog v-model="dialogDelete" max-width="600px">
            <v-card>
              <v-card-title class="text-h5">¿Seguro que quieres dar de baja este proyecto?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">CANCELAR</v-btn>
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
      headers: [
        { text: 'Descripcion', value: 'descripcion' },
        { text: 'Fecha de inicio', value: 'fecha_inicio' },
        { text: 'Fecha de finalizacion', value: 'fecha_fin' },
        { text: 'Lugar', value: 'lugar' },
        { text: 'Dar de baja', value: 'actions', sortable: false },
      ],
      proyectos: [],
      editedIndex: -1,
      editedItem: {
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        fecha_baja: null,
        lugar: '',
        observaciones: ''
      },
      defaultItem: {
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        fecha_baja: null,
        lugar: '',
        observaciones: ''
      },
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
      this.getProyectos()
        
      },
  
    methods: {
      initialize() {
        this.proyectos = [
  
        ]
      },
  
      async getProyectos() {
        try {
          const response = await axios.get('http://localhost:8080/proyectos/getProyectos')
          this.proyectos = response.data
          console.log('Esta es la lista de proyectos ' + this.proyectos)
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
        this.editedIndex = this.proyectos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  
      deleteItem(item) {
        this.editedIndex = this.proyectos.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  
      async deleteItemConfirm() {
        try {
          await axios.put(`http://localhost:8080/proyectos/updateProyecto/${this.editedItem.id_proyecto}`)
          this.proyectos.splice(this.editedIndex, 1)
        } catch (error) {
          console.log('Error al dar de baja el proyecto', error)
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
            //Crear elemento
            const strJson = JSON.stringify(this.editedItem)
            const response = await axios.post('http://localhost:8080/proyectos/createProyecto', strJson, 
            {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            this.proyectos.push(response.data)
          
          this.close()
        }catch{
          console.error('Error al guardar: ', error)
        }
      },
    }
  }
  </script>