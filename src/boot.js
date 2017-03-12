import Vue from "vue";
import Router from "vue-router";
import Resource from "vue-resource";
import RouterMapping from "./components/router";
import AuthMiddleware from "./middleware/authMiddleware";
import HttpConfig from "./httpConfig";

Vue.use(Router);
Vue.use(Resource);

const router = new Router({
    routes: RouterMapping
});

/* middleware inject */
(new AuthMiddleware(router)).handle();


export default new Vue({
    el: "#app",
    router: router,
    http:HttpConfig,
});

