/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Login from "./login.vue";
import Setpwd from "./setpwd.vue";
import Resetpwd from "./resetpwd.vue";
import Help from "./help.vue";

export default {
    path: "/user",
    name: 'user',
    component: Index,
    children: [
        {
            path: "login",
            component: Login
        },
        {
            path: "setpwd",
            component: Setpwd
        },
        {
            path: "resetpwd",
            component: Resetpwd
        },
        {
            path: "help",
            component: Help
        },
    ]
}

