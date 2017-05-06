/**
 * Created by luowen on 2017/4/19.
 */

import BaseSrv from "./baseSrv";
import wx from 'wx';
export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, shareConfig) {
        let timestamp = (new Date).getTime();
        let jsTokenUrl = "wechat/jstoken?v=" + timestamp + "&url=" + url;
        this.http.get(jsTokenUrl).then((wxResp) => {
            if(wxResp.data.code === 0) {
                console.log(wxResp.data);
                console.log(wxResp.data.data);
                //console.log(wxResp.data.data);
                wx.config(wxResp.data.data);

                wx.ready(function(res){

                    console.log("wx share ok");
                    console.log(res);
                    wx.onMenuShareTimeline(shareConfig);
                    wx.onMenuShareAppMessage(shareConfig);
                });

                wx.error(function(res){
                    console.log("wxshare errro")
                    console.log(res)
                });
            } else {
                console.log("微信分享搓搓", wxResp);
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
