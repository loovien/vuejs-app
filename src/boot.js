/**
 * @FileName:
 * @Description:
 * @Author: luowenhui
 * @Email: luowenhui@bianfeng.com
 * @Time: 2017/3/10 15:38
 * @Version: 0.0.1
 * @History:
 */

//import App from "./components/app";

import Vue from "vue";
import VueRouter from "vue-router";
//import vueResource from "vue-resource";
//import VueRouteMapping from "./components/route";

Vue.use(VueRouter);
//Vue.use(vueResource);

//console.log(VueRouteMapping, "hello");

// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
});

const app = new Vue({
    router
}).$mount("#app");

