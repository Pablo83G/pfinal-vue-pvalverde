<template>
    <v-container>
        <v-row>
            <v-col>
                <v-select chips label="Select" :items="proyectos" variant="outlined">
                </v-select>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <div>
                    <v-data-table :headers="headers" :items="empleados" class="elevation-1">
                        <template v-slot:item.actions="{ item }">
                            <v-simple-checkbox v-model="item.actions" disabled></v-simple-checkbox>
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
export default {
    data() {
        return {
            proyectos: [],
            empleados: [],
            headers: [
                { text: 'Nombre', value: 'nombre' },
                { text: 'Apellidos', value: 'apellidos' },
                { text: 'Actions', value: 'actions' },
            ],
        }
    },
}
</script>