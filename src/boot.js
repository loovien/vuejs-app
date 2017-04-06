import Vue from "vue";
import Router from "vue-router";
import Resource from "vue-resource";
import RouterMapping from "./components/router";
import AuthMiddleware from "./middleware/authMiddleware";
import Config from "./config";
import ConsoleHttpResponse from "./middleware/httpInject";

import layouts from './layouts.vue'

Vue.use(Router);
Vue.use(Resource);

/* set http global configuration */
Vue.http.options = Config.http;

/* install http interceptors */
Vue.http.interceptors.push(ConsoleHttpResponse);

const router = new Router({
    mode: "history",
    //mode: "hash",
    routes: RouterMapping
});


/* middleware inject */
(new AuthMiddleware(router, Vue.http)).handle();


new Vue({
    el: "#app",
    router: router,
    components: { layouts }
});

