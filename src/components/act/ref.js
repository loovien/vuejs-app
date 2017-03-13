/**
 * Created by luowen on 2017/3/11.
 */

import Index from "./index.vue";
import Industry from "./industry.vue"
import Detail from "./detail.vue";
import Newact from "./newact.vue";

export default {
    path: "/act",
    name: "act",
    component: Index,
    children: [
        {
            path: "entity/:id",
            name: "act_detail",
            component: Detail
        },
        {
            path: "industry/:id",
            name: "act_industry",
            component: Industry
        },
        {
            path: "new/:id",
            name: "act_new",
            component: Newact,
            meta: {auth: true}
        }
    ]
}
