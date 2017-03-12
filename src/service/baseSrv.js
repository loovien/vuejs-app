/**
 * Created by luowen on 2017/3/12.
 */

export default class BaseSrv {
    constructor(component) {
        this.component = component;
        this.http = component.$http;
    }
}
