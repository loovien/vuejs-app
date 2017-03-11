/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";

export default {
    path: "/mine",
    name: "mine",
    meta: { auth: true }, // visit it must login
    component: Index,

    children: [

    ],

}
