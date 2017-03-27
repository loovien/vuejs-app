/**
 * Created by luowen on 2017/3/13.
 */

import BaseSrv from "./baseSrv";

export default class ActSrv extends BaseSrv {

    /**
     * 根据id获取活动信息
     *
     * @param id
     */
    getActDetail(id) {
        return this.http.get("act/"+id);
    }

    /**
     * 获取分类下的所有活动模版
     *
     * @param id
     */
    getIndustryActs(id) {
        return this.http.get("act/industry/"+id);
    }

    /**
     * 创建新的用户活动
     *
     * @param postData
     * @returns {*}
     */
    newAct(postData) {
        return this.http.post("act/u");
    }

    /**
     * 获取默认排行榜
     */
    getDefaultRank() {
        return this.http.get("act/rank");
    }

    getActInfo(query) {
        return this.http.get("act/" + query.id);
    }

    getRank(query) {
        return this.http.get("act/rank/" + query.id)
    }

    getUserInfo(query) {
        return this.http.get("act/u/" + query.id)
    }

    helpIt(query) {
        return this.http.post("act/u/helper", query);
    }
}
