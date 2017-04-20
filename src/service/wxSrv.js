/**
 * Created by luowen on 2017/4/19.
 */

import BaseSrv from "./baseSrv";
import wx from 'wx';
export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, callback) {
        this.http.get("wechat/jstoken?url="+url).then((wxResp) => {
            if(wxResp.data.code === 0) {
                alert(window.wx)
                console.log(window.wx)
                console.log(wxResp);
                wx.config(wxResp.data.data);

                callback(true);
            } else {
                console.log("微信分享搓搓", wxResp);
                callback(false)
            }
        });
    }

    onMenuShareTimeline(shareConfig) {
        console.log(shareConfig, 'apptieline');
        wx.onMenuShareTimeline(shareConfig);
    }

    onMenuShareAppMessage(shareConfig) {
        console.log(shareConfig, 'meneu');
        wx.onMenuShareAppMessage(shareConfig);
    }
}
