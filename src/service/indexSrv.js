/**
 * Created by luowen on 2017/3/12.
 */

import BaseSrv from "./baseSrv";

export default class IndexSrv extends BaseSrv {

    getBannerImg() {
        return this.http.get("mobile/banner");
    }

    getIndustryList() {
        return this.http.get("industry");
    }

    getRecommendList() {
        return this.http.get("act/recommd");
    }

}



