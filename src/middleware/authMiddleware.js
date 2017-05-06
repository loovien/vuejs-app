/**
 * Created by luowen on 2017/3/11.
 */

import AuthUtil from "../utils/authUtil";

export default class AuthMiddleware {
    constructor(router, http) {
        this.router = router;
        this.http = http;
    }

    handle () {
        const router = this.router;
        const authUtil = new AuthUtil(this.http);
        router.beforeEach((to, from, next) => {
            if(!authUtil.hasWxOpenId()) {
                let code = to.query.code;
                if(code) { /* if code exists then get user information */
                    authUtil.setUserInfo(code, (ok) => {
                        if(!ok) {
                          this.goWxAuthenticateUrl();
                        } else {
                            let href = window.location.href;
                            let indexOfQ = href.indexOf('?');
                            if(indexOfQ !== -1) {
                                href = href.substr(0, indexOfQ);
                            }
                            window.location.href = href;
                            return;
                        }
                    });
                } else { /* redirect to wechat server run OAuth2 flow */
                    this.goWxAuthenticateUrl();
                }
            }
            //TODO just for test
            if (to.matched.some(record => record.meta.auth)) {
                // this route requires auth, check if logged in
                // if not, redirect to login page.
                authUtil.isLogin(function (isLogin) {
                    if(isLogin) {
                        if(authUtil.isExpired() && to.matched.some(record => record.meta.rich)) {
                            next({
                                name: "userHelp" ,
                                query: {redirect: to.fullPath}
                            });
                        } else {
                            next();
                        }
                    } else {
                        next({
                            name: "userLogin",
                            query: { redirect: to.fullPath }
                        });
                    }
                });
                /* user has not expired can visit routes */
            } else {
                next();
            }
        });
    }

    goWxAuthenticateUrl () {
        const authUtil = new AuthUtil(this.http);
        authUtil.getWxAuthUrl().then((resp) => {
            let redirectUrl = resp.data.data.redirectUrl;
            redirectUrl += `&redirect_uri=${window.location.href}`;
            let handle = setTimeout(function () {
                document.location.href = redirectUrl;
                clearTimeout(handle)
                return;
            }, 200);
            return;
        });
        return;
    }
}
