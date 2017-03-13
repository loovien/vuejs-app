/**
 * Created by luowen on 2017/3/13.
 */

import BaseSrv from "./baseSrv";

export default class ActSrv extends BaseSrv {

    getActDetail(id) {
        return this.http.get("act/"+id);
    }

    getIndustryActs(id) {
        return this.http.get("act/industry/"+id);
    }
}
