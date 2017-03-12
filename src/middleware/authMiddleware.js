/**
 * Created by luowen on 2017/3/11.
 */

import AuthSrv from "../service/authSrv";

export default class AuthMiddleware {
    constructor(router) {
        this.router = router;
    }

    handle () {
        const router = this.router;
        const authSrv = new AuthSrv();
        router.beforeEach((to, from, next) => {
            if (to.matched.some(record => record.meta.auth)) {
                // this route requires auth, check if logged in
                // if not, redirect to login page.
                if (!authSrv.isLogin()) {
                    next({
                        //path: '/',
                        name: "userLogin",
                        query: { redirect: to.fullPath }
                    })
                } else {
                    next()
                }
            } else {
                next(); // 确保一定要调用 next()
            }
        });
    }
}
