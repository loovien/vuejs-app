/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Industry from "./industry.vue"
import Detail from "./template_1/detail.vue";
import Newact from "./template_1/newact.vue";

export default {
    path: "/act",
    name: "act",
    component: Index,
    children: [
        {
            path: "template_1/:id",
            name: "act_detail",
            component: Detail
        },
        {
            path: "industry/:id:title",
            name: "act_industry",
            component: Industry
        },
        {
            path: "template_1/new/:id",
            name: "act_new",
            component: Newact,
            meta: {auth: true}
        }
    ]
}
