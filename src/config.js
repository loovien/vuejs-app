/**
 * Created by luowen on 2017/3/11.
 */

export default {
    http: {
        root: "http://admin.shangjialian.com/api",
         //root: "http://shangjialian.51lianying.com/api",
        headers: {
            "ContentType": "application/json",
            //Authorization: 'Bear access_token',
            "X-Requested-With": "XMLHttpRequest"
        },
        credentials: true,

    }
}
