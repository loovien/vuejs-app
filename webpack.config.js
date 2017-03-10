/**
 * @FileName:
 * @Description:
 * @Author: luowenhui
 * @Email: luowenhui@bianfeng.com
 * @Time: 2017/3/10 15:37
 * @Version: 0.0.1
 * @History:
 */

module.exports = {
    // the main entry of our app
    entry: ['./src/boot.js', './src/service/auth-srv.js'],
    // output configuration
    output: {
        path: __dirname + '/dist/',
        publicPath: 'dist/',
        filename: 'dist.js'
    },

    module: {
        loaders: [
            // process *.vue files using vue-loader
            { test: /\.vue$/, loader: 'vue-loader' },
            // process *.js files using babel-loader
            // the exclude pattern is important so that we don't
            // apply babel transform to all the dependencies!
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
}
