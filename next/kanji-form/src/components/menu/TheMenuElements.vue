<template>
        <v-list
          v-model:selected="selected"
          :items="items"
          @click.select="go"
        ></v-list>

</template>
<script setup>

import {ref} from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const selected = ref(null)

const items = ref([

     {
        title: 'Grupo Yomi On',
        value: 'yomi-on',
        
    },

    {
        title: "Hiragana",
        value: "hiragana"
    },

    {
        title: "Katakana",
        value: "katakana"
    },

])

function go(){

   router.push(`/${selected.value[0]}`)

}

</script>
