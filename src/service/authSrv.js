/**
 * @FileName:
 * @Description:
 * @Author: luowenhui
 * @Email: luowenhui@bianfeng.com
 * @Time: 2017/3/10 15:39
 * @Version: 0.0.1
 * @History:
 */

export default class Auth {
    constructor(isAuthenticated = false) {
        this.authenticated = isAuthenticated;
    }

    login(context, credentials, redirectUrl = '/') {
        return context.$http.post("/login", credentials, (data) => {
            localStorage.setItem('_token', data.token);
            return this.authenticated = true;
        }).error((error) => {
            context.error = error;
            return false;
        });
    }

    isLogin () {
        return !!localStorage.getItem('_token');
    }
}
