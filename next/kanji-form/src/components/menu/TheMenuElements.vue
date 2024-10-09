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

])

function go(){

   router.push("/yomi-on")

}

</script>
