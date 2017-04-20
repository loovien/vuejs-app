/**
 * Created by luowen on 2017/4/19.
 */

import wx from "../library/jweixin-1.2.0";
import BaseSrv from "./baseSrv";

export default class  WxSrv extends BaseSrv  {
    checkWx() {
        this.http.get("")
    }
}
