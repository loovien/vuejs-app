/**
 * Created by luowen on 2017/3/15.
 */

import BaseSrv from "./baseSrv";

export default  class MineSrv extends BaseSrv {
    getNoStartActs() {
        return this.http.get("");
    }

    getStartedActs() {
        return this.http.get("");
    }

    getEndActs() {
        return this.http.get("");
    }

    deleteActById(id) {
        return this.http.delete("");
    }

    updateActById(act) {
        return this.http.put("");
    }
}
