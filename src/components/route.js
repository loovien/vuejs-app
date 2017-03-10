/**
 * @FileName:
 * @Description:
 * @Author: luowenhui
 * @Email: luowenhui@bianfeng.com
 * @Time: 2017/3/10 15:41
 * @Version: 0.0.1
 * @History:
 */

import Home from "./home/index";
import App from "./app";

const a = new App();
export default [
    {path: '/', component: a.template()},
];

