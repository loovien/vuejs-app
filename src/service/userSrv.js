/**
 * Created by luowen on 2017/3/13.
 */
import BaseSrv from "./baseSrv";

export default class UserSrv extends BaseSrv {
    login(credentials) {
        return this.http.post("user/login", credentials);
    }


    register(credentials) {
        return this.http.post("user/register", credentials);
    }
}

