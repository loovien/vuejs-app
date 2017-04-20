/**
 * Created by luowen on 2017/4/19.
 */

import wx from "../library/jweixin-1.2.0";
import BaseSrv from "./baseSrv";

export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, callback) {
        this.http.get("wechat/jstoken?url="+url).then((wxResp) => {
            if(wxResp.data.code === 0) {
                alert(wx)
                console.log(wx)
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
        wx.onMenuShareTimeline(shareConfig);
    }

    onMenuShareAppMessage(shareConfig) {
        wx.onMenuShareAppMessage(shareConfig);
    }
}
