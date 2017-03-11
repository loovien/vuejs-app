import Vue from "vue";
import Router from "vue-router";
import Resource from "vue-resource";
import RouterMapping from "./components/router";
import AuthMiddleware from "./middleware/authMiddleware";

console.log(RouterMapping, 'mapping');

Vue.use(Router);
Vue.use(Resource);

const router = new Router({
    routes: RouterMapping
});

/* middleware inject */
(new AuthMiddleware(router)).handle();


export default new Vue({
    router: router,
}).$mount("#app");

