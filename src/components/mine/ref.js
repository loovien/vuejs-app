/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Started from "./started.vue";
import End from "./end.vue";
import Info from "./info.vue";
import Nostart from "./notstart.vue";

export default {
    path: "/mine",
    name: "mine",
    //meta: { auth: true }, // visit it must login
    component: Index,

    children: [
        {name: "mineIndex", path: "", component: Info, meta: {auth: true}},
        {name: 'mineStart', path: "start", component: Started, meta: {auth: true}},
        {name: 'mineNostart', path: "nostart", component: Nostart, meta: {auth: true}},
        {name: 'mineEnd', path: "end", component: End, meta: {auth: true}}
    ],

}
