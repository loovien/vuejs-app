/**
 * Created by luowen on 2017/4/19.
 */

import BaseSrv from "./baseSrv";
import wx from 'wx';
export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, shareConfig) {
        this.http.get("wechat/jstoken?url="+url).then((wxResp) => {
            if(wxResp.data.code === 0) {
                console.log(wxResp.data.data);
                wx.config(wxResp.data.data);

                wx.ready(function(){
                    console.log("share register success")
                    wx.onMenuShareTimeline(shareConfig);
                    wx.onMenuShareAppMessage(shareConfig);
                });
            } else {
                console.log("微信分享搓搓", wxResp);
                wx.error(function(res){
                    console.log(res, 'register share erro')
                });
            }
        });
    }

    onMenuShareTimeline(shareConfig) {
    }

    onMenuShareAppMessage(shareConfig) {
    }
    onError() {
    }
    onSuccess() {
    }
}
