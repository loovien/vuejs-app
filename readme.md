# 51lianying商家恋 - 前端

## 结构说明

1. `src/boot.js` 项目启动主入口文件.
2. `src/config.js` 项目全局配置文件.
3. `src/components/` 项目组件目录.
    - `layouts.vu`e 项目布局入口
    - `ref.js`  项目vue-router 根配置.
        - `shared` 共享的公共组建
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


## 更新日志

1. 加入了微信校验, 第一次访问的时候在url后面带上 `code=随机字符`

    ```javascript
        http://localhost:8080/#/?code=2222222222222222222222222222222222
    ```
2. 进入个人中心需要登入, 记住绑定的手机和密码

### 遗留问题

1. 活动编辑页面, 活动删除处理
2. 404页面
3. 商家新建活动规则添加规则
4. 活动倒计时问题
5. 返回按钮不友好
6. 个人中心头像是没有的
7. 微信分享

