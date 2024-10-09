import { createMemoryHistory, createRouter } from 'vue-router'

import TheMainPage from "@/components/TheMainPage.vue"
import TheYomiOnGroup from "@/components/yomi/TheYomiOnGroup.vue"

const routes = [

    {

        path: "",

        component: TheMainPage

    },

    {
        path: "/yomi-on",

        component: TheYomiOnGroup

    }

]

const router = createRouter({
      history: createMemoryHistory(),
      routes,
})

export default router
