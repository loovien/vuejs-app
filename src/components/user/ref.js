/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Login from "./login.vue";
import Setpwd from "./setpwd.vue";
import Resetpwd from "./resetpwd.vue";
import Help from "./help.vue";
import Register from "./register.vue";

export default {
    path: "/user",
    name: 'user',
    component: Index,
    children: [
        {
            path: "register",
            name: "userRegister",
            component: Register
        },
        {
            path: "login",
            name: "userLogin",
            component: Login
        },
        {
            path: "setpwd",
            name: "userSetpwd",
            component: Setpwd
        },
        {
            path: "resetpwd",
            name: "userResetpwd",
            component: Resetpwd
        },
        {
            path: "help",
            name: "userHelp",
            component: Help
        },
    ]
}

