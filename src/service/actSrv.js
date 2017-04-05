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
     * 获取用户信息
     * @param query
     */
    getUserInfo(query) {
        return this.http.get("act/shared/" + query.actId)
    }


    /**
     * 创建新的用户活动
     *
     * @param postData
     * @returns {*}
     */
    newAct(postData) {
        return this.http.post("act/u", postData);
    }

    /**
     * 获取默认排行榜
     */
    getDefaultRank() {
        return this.http.get("act/rank");
    }

    /**
     * 获取活动信息
     * @param query
     */
    getActInfo(query) {
        return this.http.get("act/shared/" + query.actId);
    }

    /**
     * 获取活动排行帮
     * @param query
     */
    getRank(query) {
        return this.http.get("act/shared/rank/" + query.actId)
    }

    /**
     * 帮用户积攒, 或其他方式
     * @param query
     * @returns {*}
     */
    helpIt(query) {
        return this.http.post("act/shared/helpit", query);
    }
}
