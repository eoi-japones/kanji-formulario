<template>
<v-app-bar 

    :elevation="2"
     color="teal-darken-4"
     image="https://picsum.photos/1920/1080?random"
    >
  <template v-slot:prepend>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  </template>

  <v-app-bar-title>Kanji Formularios</v-app-bar-title>
</v-app-bar>

<v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'bottom' : undefined"
    temporary
>

    <TheMenuElements />

</v-navigation-drawer>


</template>
<script setup>

import {ref} from "vue"
import TheMenuElements from "@/components/menu/TheMenuElements.vue"

const drawer = ref(false)

</script>
