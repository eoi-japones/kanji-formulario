import { createWebHistory, createRouter } from 'vue-router'

import TheMainPage from "@/components/TheMainPage.vue"
import TheYomiOnGroup from "@/components/yomi/TheYomiOnGroup.vue"
import TheKana from "@/components/kana/TheKana.vue"

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

    },

    {
        path: "/katakana",

        component: TheKana,

        props: {

            esHiragana: false

        }
    },

    {
        path: "/hiragana",

        component: TheKana,

        props: {

            esHiragana: true

        }

    }

]

const router = createRouter({
      history: createWebHistory("/kanji-formulario/next"),
      routes,
})

export default router
