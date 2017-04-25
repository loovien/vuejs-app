/**
 * Created by luowen on 2017/3/15.
 */

import BaseSrv from "./baseSrv";

export default  class MineSrv extends BaseSrv {
    getTop1() {
        return this.http.get("mine/top1");
    }
    getNoStartActs(page) {
        return this.http.get("mine/nostart?page="+page);
    }

    getStartedActs(page) {
        return this.http.get("mine/start?page="+page);
    }

    getEndActs(page) {
        return this.http.get("mine/end?page="+page);
    }

    deleteActById(id) {
        return this.http.delete("act/u/"+id);
    }

    updateActById(act) {
        return this.http.put("act/u/"+id, act);
    }

    getPrizeList(mobile) {
        return this.http.get("mine/prize?mobile=" + mobile);
    }

    exchange(postData) {
        return this.http.post("mine/prize/exchange", postData);
    }
}

