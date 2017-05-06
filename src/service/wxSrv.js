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
                alert('jscheckok');
                console.log(wxResp);
                //console.log(wxResp.data.data);
                wx.config(wxResp.data.data);

                wx.ready(function(){
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
