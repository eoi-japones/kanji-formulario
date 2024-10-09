<template>
  <v-container>
    <v-form v-model="valid">
      <!-- Campo 'id' -->
      <v-text-field
        v-model="form.id"
        label="Identificador del grupo"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <!-- Campo 'nombre' -->
      <v-text-field
        v-model="form.nombre"
        label="Nombre del grupo extendido"
        :rules="[rules.required, rules.nombre]"
        required
      ></v-text-field>

      <!-- Campo 'tipo' (Enum) -->
      <v-select
        v-model="form.tipo"
        :items="['puro', 'semi-puro', 'mixto']"
        label="Tipo de grupo"
        :rules="[rules.required]"
        required
      ></v-select>

      <!-- Campo 'señalizador' -->
      <v-text-field
        v-model="form.señalizador"
        label="Kanji que señaliza el grupo"
      ></v-text-field>

      <!-- Campo 'lectura' -->
      <v-text-field
        v-model="form.lectura"
        label="Lectura que señaliza al grupo"
        :rules="[rules.required, rules.lectura]"
      ></v-text-field>

      <!-- Campo 'integrantes' (Array) -->
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col>
          <h4>Integrantes</h4>
          <v-btn @click="addIntegrante">Agregar Integrante</v-btn>
          <v-row v-for="(integrante, index) in form.integrantes" :key="index" class="mt-2">
            <v-text-field
              v-model="form.integrantes[index]"
              label="Integrante"
              class="mr-4"
            ></v-text-field>
            <v-btn icon @click="removeIntegrante(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <!-- Campo 'especiales' (Array) -->
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col>
          <h4>Especiales</h4>
          <v-btn @click="addEspecial">Agregar Especial</v-btn>
          <v-row v-for="(especial, index) in form.especiales" :key="index" class="mt-2">
            <v-text-field
              v-model="form.especiales[index]"
              label="Especial"
              class="mr-4"
            ></v-text-field>
            <v-btn icon @click="removeEspecial(index)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

      <!-- Campo 'ejemplos' (Object) -->
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col>
          <h4>Ejemplos</h4>
          <v-btn @click="addEjemplo">Agregar Ejemplo</v-btn>
          <v-row v-for="(ejemplo, key) in form.ejemplos" :key="key" class="mt-2">
            <v-text-field
              v-model="ejemplo.palabra"
              label="Palabra"
              class="mr-4"
            ></v-text-field>
            <v-text-field
              v-model="ejemplo.significado"
              label="Significado"
            ></v-text-field>
            <v-btn icon @click="removeEjemplo(key)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>

     <v-divider class="my-4"></v-divider>
     <v-row>

        <!-- Botones de enviar y resetear -->
        <v-col cols="2">
            <v-btn @click="submit">Crear grupo</v-btn>
        </v-col>
        
        <v-col cols="2">
            <v-btn @click="resetForm">Reset</v-btn>
        </v-col>
     </v-row>

    </v-form>
  </v-container>
</template>
<script setup>

import {ref} from "vue"

import DataDumper from "@/utiles/dumper.js"

const valid = ref(false);
const form = ref({
    id: '',
    nombre: '',
    tipo: '',
    señalizador: '',
    lectura: '',
    integrantes: [],
    especiales: [],
    ejemplos: {},
});

const rules = {
    required: (value) => !!value || 'Este campo es obligatorio.',
    nombre: (value) => value.length > 3 || 'El nombre ha de tener más de tres caracteres',
    lectura: (value) => value.match(/^[ァ-ヴー]+$/) || 'La lectura ha de estar en katakana',
};

// Métodos para manejar arrays (integrantes y especiales)
const addIntegrante = () => {
    form.value.integrantes.push('');
};
const removeIntegrante = (index) => {
    form.value.integrantes.splice(index, 1);
};

const addEspecial = () => {
    form.value.especiales.push('');
};
const removeEspecial = (index) => {
    form.value.especiales.splice(index, 1);
};

// Métodos para manejar objetos anidados (ejemplos)
const addEjemplo = () => {
    const key = `ejemplo-${Object.keys(form.value.ejemplos).length + 1}`;
    form.value.ejemplos[key] = { palabra: '', significado: '' };
};
const removeEjemplo = (key) => {
    delete form.value.ejemplos[key];
};

const submit = () => {

    if(valid.value){

        DataDumper(form.value, "foo.yaml")

    }
    else{
        alert("Hay errores en el formulario")
    }

};

const resetForm = () => {
    form.value = {
    id: '',
    nombre: '',
    tipo: '',
    señalizador: '',
    lectura: '',
    integrantes: [],
    especiales: [],
    ejemplos: {},
    };
};

</script>
