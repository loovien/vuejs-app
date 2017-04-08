/**
 * Created by luowen on 2017/3/20.
 */

export default class jAuthUtil {
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

    logout() {
        this.removeName();
        this.removeMobile();
        this.removeExpiredDays();
    }

    getWxAuthUrl () {
        return this.http.get("wechat/authorization");
    }

    isExpired() {
        return sessionStorage.getItem("_expired_days") <= 0;
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
                this.setOpenId(data.openid);
                if(!!data.isAvailable)
                    this.setIsAvailable(data.isAvailable);
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

    getName() {
        return sessionStorage.getItem("_name");
    }

    setName(name) {
        sessionStorage.setItem("_name", name);
    }

    removeName() {
        return sessionStorage.removeItem("_name");
    }

    getMobile() {
        return sessionStorage.getItem("_mobile");
    }

    setMobile(mobile) {
        sessionStorage.setItem("_mobile", mobile);
    }

    removeMobile() {
        return sessionStorage.removeItem("_mobile");
    }

    getExpiredDays() {
        return sessionStorage.getItem("_expired_days");
    }

    setExpiredDays(expiredDays) {
        sessionStorage.setItem("_expired_days", expiredDays);
    }

    removeExpiredDays() {
        return sessionStorage.removeItem("_expired_days");
    }

    getOpenId() {
        return sessionStorage.getItem("_openid");
    }

    setOpenId(openid) {
        return sessionStorage.setItem("_openid", openid);
    }

    removeOpenId() {
        return sessionStorage.removeItem("_openid");
    }

    getIsAvailable() {
        return sessionStorage.getItem("_is_available");
    }

    setIsAvailable(available) {

        return sessionStorage.setItem("_is_available", available);
    }

    removeAvailable() {
        return sessionStorage.removeItem("_is_available");
    }

}

