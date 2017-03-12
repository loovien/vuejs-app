# vue2 构建单页应用骨架

## 结构说明

1. `src/boot.js` 项目启动主入口文件.
2. `src/config.js` 项目全局配置文件.
3. `src/components/` 项目组件目录.
    - `layouts.vu`e 项目布局入口
    - `ref.js`  项目vue-router 根配置.
        - `user/` 用户模块
            - `ref.js` 用户模块路由配置
            - `index.vue` 用户模块根布局, 独立的模块, 没有集成layouts
4. `src/filters` 项目公用filters目录
5. `src/middleware` vue-router拦截注入.
6. `src/service` 业务逻辑目录, 主要封装获取服务端数据类.
7. `src/utils` 封装一些项目公共使用的类.
8. `index.html` 项目html入口文件.
9. `webpack.config.js` webpack打包工具配置文件.


## 使用

1. 确保安装了node环境, 没有自行安装[node官网](https://nodejs.org/en/)

2. 下载项目, 安装运行.

    ```bash
        $ git clone https://github.com/vvotm/vuejs-app.git
        $ cd vuejs-app
        $ npm install
        $ npm start
    ```

3. 打开浏览器, 访问[http://localhost:8080](http://localhost:8080)

4. 有问题创建issue.

