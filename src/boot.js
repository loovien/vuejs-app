import Vue from "vue";
import Router from "vue-router";
import Resource from "vue-resource";
import RouterMapping from "./components/router";
import AuthMiddleware from "./middleware/authMiddleware";
import Config from "./config";

Vue.use(Router);
Vue.use(Resource);

/* set http global configuration */
Vue.http.options = Config.http;
const router = new Router({
    //mode: "history",
    mode: "hash",
    routes: RouterMapping
});

/* middleware inject */
(new AuthMiddleware(router)).handle();


export default new Vue({
    el: "#app",
    router: router,
});

