/**
 * Created by luowen on 2017/3/20.
 */

export default class AuthUtil {
    constructor(http, isAuthenticated = false) {
        this.http = http;
        this.authenticated = isAuthenticated;
    }

    login(context, credentials, redirectUrl = '/') {
        return this.$http.post("/login", credentials, (data) => {
            localStorage.setItem('_token', data.token);
            return this.authenticated = true;
        }).error((error) => {
            context.error = error;
            return false;
        });
    }

    getWxAuthUrl () {
        return this.http.get("wechat/authorization");
    }

    isExpired() {
        return !!sessionStorage.getItem("_expired_days");
    }

    isLogin () {
        return !!sessionStorage.getItem('_mobile');
    }

    hasWxOpenId() {
        return !!sessionStorage.getItem("_openid");
    }

    setUserInfo(code, callback) {
        return this.http.get("wechat/userinfo?code=" + code).then((resp) => {
            if(resp.data.code === 0) {
                const data = resp.data.data;
                sessionStorage.setItem("_openid", data.openid);
                if(!!data.isAvailable)
                    sessionStorage.setItem("_is_available", data.isAvailable);
                if(!!data.name)
                    this.setName(data.name);
                if(!!data.mobile)
                    this.setMobile(data.mobile);
                if(!!data.expireDays)
                    this.setExpiredDays(data.expireDays);
                callback(true);
            } else {
                callback(false);
            }
        });
    }

    setName(name) {
        sessionStorage.setItem("_name", name);
    }

    setMobile(mobile) {
        sessionStorage.setItem("_mobile", mobile);
    }

    setExpiredDays(expiredDays) {
        sessionStorage.setItem("_expired_days", expiredDays);
    }
}

