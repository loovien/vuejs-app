/**
 * http interceptor show all http response in console
 *
 * Created by luowen on 2017/3/26.
 */


export default function (request, next) {
    next((response) => {
        console.info("😄", response.data.data, request.method, '=>',request.root+'/'+request.url);
    });
}


