/**
 * @FileName:
 * @Description:
 * @Author: luowenhui
 * @Email: luowenhui@bianfeng.com
 * @Time: 2017/3/10 17:01
 * @Version: 0.0.1
 * @History:
 */

import IndexTemp from "../../views/home/index.vue";

export default class Home {
    data() {
        return {
            name: 'data'
        }
    }

    template () {
        return IndexTemp.render();
    }

    render() {
        return IndexTemp;
    }
}
