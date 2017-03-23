/**
 * Created by luowen on 2017/3/15.
 */

import BaseSrv from "./baseSrv";

export default  class MineSrv extends BaseSrv {
    getTop1() {
        return this.http.get("mine/top1");
    }
    getNoStartActs() {
        return this.http.get("mine/nostart");
    }

    getStartedActs() {
        return this.http.get("mine/start");
    }

    getEndActs() {
        return this.http.get("mine/end");
    }

    deleteActById(id) {
        return this.http.delete("act/u/"+id);
    }

    updateActById(act) {
        return this.http.put("act/u/"+id, act);
    }
}
