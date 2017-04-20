/**
 * Created by luowen on 2017/4/19.
 */

import BaseSrv from "./baseSrv";
import wx from 'wx';
export default class  WxSrv extends BaseSrv  {
    initWxJsConfig(url, callback) {
        this.http.get("wechat/jstoken?url="+url).then((wxResp) => {
            if(wxResp.data.code === 0) {
                console.log(wxResp.data.data);
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

    onError() {
        wx.error(function(res){
            console.log(res, '----------------------------------');
        });
    }

    onSuccess() {
        wx.ready(function(){
            console.log('--success--------------------------------');
        });
    }
}
