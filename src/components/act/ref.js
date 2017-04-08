/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Industry from "./industry.vue"
import Detail from "./template_1/detail.vue";
import Newact from "./template_1/newact.vue";
import Editact from "./template_1/editact.vue";
import Template1 from "./template_1/shared.vue";

export default {
    path: "/act",
    name: "act",
    component: Index,
    children: [
        {
            path: "template_1/:id",
            name: "actDetail",
            component: Detail
        },
        {
            path: "industry/:id:title",
            name: "actIndustry",
            component: Industry
        },
        {
            path: "template_1/new/:id",
            name: "actNew",
            component: Newact,
            meta: {auth: true ,rich: true}
        },
        {
            path: "template_1/edit/:id",
            name: "actEdit",
            component: Editact,
            meta: {auth: true, rich: true}
        },
        {
            path: "shared/:actId/:openid",
            name: "template1Shared",
            component: Template1
        }
    ]
}
