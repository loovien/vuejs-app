/**
 * Created by luowen on 2017/4/19.
 */

import BaseSrv from "./baseSrv";
export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, callback) {
        this.http.get("wechat/jstoken?url="+url).then((wxResp) => {
            if(wxResp.data.code === 0) {
                alert(window.wx)
                console.log(window.wx)
                console.log(wxResp);
                window.wx.config(wxResp.data.data);

                callback(true);
            } else {
                console.log("微信分享搓搓", wxResp);
                callback(false)
            }
        });
    }

    onMenuShareTimeline(shareConfig) {
        window.wx.onMenuShareTimeline(shareConfig);
    }

    onMenuShareAppMessage(shareConfig) {
        window.wx.onMenuShareAppMessage(shareConfig);
    }
}
