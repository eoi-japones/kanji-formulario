<template>
  <v-container>
    <v-form v-model="valid">
      <!-- Campo 'id' -->
      <v-text-field
        v-model="form.id"
        :label="label('Identificador del kana (como compuesto)')"
        :rules="[rules.required, rules.validKana]"
        required
      ></v-text-field>

      <!-- Campo 'clave' -->
      <v-text-field
        v-model="form.clave"
        :label="label('Clave asignada al kana')"
        :rules="[rules.required, rules.validClave]"
        required
      ></v-text-field>

      <!-- Campo 'historia' -->
      <v-textarea
        v-model="form.historia"
        :label="label('Historia representativa de los componentes del kana')"
        :rules="[rules.required]"
        required
      ></v-textarea>

      <!-- Botones de enviar y resetear -->
      <v-btn @click="submit">Submit</v-btn>
      <v-btn @click="resetForm">Reset</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>

import {ref} from "vue"

import DataDumper from "@/utiles/dumper.js"

const props = defineProps({

	esHiragana: {

		type: Boolean,

		required: true

	}

})

const valid = ref(false);

const form = ref({
  id: '',
  clave: '',
  historia: '',
  componentes: [],
  solo_componente: 0,
});

const rules = {
  required: (value) => !!value || 'Este campo es obligatorio.',
  validKana: (value) => {
	if(props.esHiragana){
		return value.match(/^[ぁ-ん]+$/) || 'El símbolo ha de ser un hiragana'
	}
	else{
    	return value.match(/^[ァ-ヴー]+$/) || 'El símbolo ha de ser un Katakana'
	}
  },
  validClave: (value) => value.match(/^[a-zA-Z-\s]+$/) || 'La clave no es válida'
};

// Métodos para manejar arrays (componentes)
const addComponente = () => {
  form.value.componentes.push('');
};
const removeComponente = (index) => {
  form.value.componentes.splice(index, 1);
};

function label(texto){

	if(props.esHiragana){
		return texto.replace(/kana/g, "Hiragana")
	}
	else{
		return texto.replace(/kana/g, "Katakana")
	}	
}

const submit = () => {

    if(valid.value){

        DataDumper(form.value, `${form.value.id}-${props.esHiragana ? "hiragana" : "katakana"}.yaml`)

    }
    else{
        alert("Hay errores en el formulario")
    }

};

const resetForm = () => {
  form.value = {
    id: '',
    clave: '',
    historia: '',
    componentes: [],
    solo_componente: 0,
  };
};

</script>

