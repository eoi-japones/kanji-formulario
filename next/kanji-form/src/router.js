import { createWebHistory, createRouter } from 'vue-router'

import TheMainPage from "@/components/TheMainPage.vue"
import TheYomiOnGroup from "@/components/yomi/TheYomiOnGroup.vue"

const routes = [

    {

        path: "/",

        component: TheMainPage,

        name: "Root"

    },

    { path: "/index.html", redirect: { name: "Root" }},

    {
        path: "/yomi-on",

        component: TheYomiOnGroup

    }

]

const router = createRouter({
      history: createWebHistory("/kanji-formulario/next"),
      routes,
})

export default router
