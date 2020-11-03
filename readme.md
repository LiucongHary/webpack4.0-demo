    ES Moudule 
        注意：使用es6导入就必须使用ES6导出
        引入： import xx from './....'
        导出 export default xx
     commonJS
     	引入 require(路径)
     	导出 modules.exports= xx
     CMD
     ADM

webpack 4.X

        "webpack": "^4.43.0", / '4.26.0'
        "webpack-cli": "^3.3.11" / '3.1.2'



webpack 模块打包工具 (js翻译器 可以识别import和require引入)

	注意：引入的js文件和css文件打包的方式是不同的

wepack 安装 与 初始化

    webpack 不建议安装全局
    
    查看webpack的版本
    在工程目录下 npx webpack -v (npx在当前项目目录的node_modules目录下找webpack包，找不到之后再去全局中找)
    安装确定的版本号
    npm info webpack 查看webpack的版本信息
    npm install webpack@版本号 webpack-cli -D (webpack-cli作用:可以在命令行中使用webpack的命令)
    
    
    初始化
    1 npm init -y
    2 npm install webpack webpack-cli --save-dev
    3 npx webpack index.js  // 用webpack翻译xx 文件

webpack 中的package.json

    "private":true , // 私有
    "main":"index.js", // 向外暴露js文件
     "license":'',    //是否开源设置
     "script":{
         "built":"webpack"  // npm run webpack 可以直接打包
     }
     

webpack的配置

    默认配置 webpack.config.js
    const path = require('path);
    module.exports = {
    	mode:'production', // 默认模式  or值为development打包代码不会被压缩
        entry:'相对路径', // 打包入口文件  入口文件不简写情况下{main:'路径'} 
        output:{
            filename:'main.js', // 打包的文件名称 filename:{main:'main.js'}
            path:path.resolve(__dirname,'dist') //打包的文件夹 绝对路径
        }
    }
    
    运行 npx webpack 即可打包
    打包输出的信息
    Hash:本次打包唯一的hash值
    version:本次使用的webpack的版本
    time:整体打包耗时
    asset：打包出来的文件名
    size:打包出来文件的大小
    chunks: 文件对应的id值，和与打包文件有关的id值
    chunk name:对应文件的名字
    entrypoint: 入口文件
    本次文件打包文件
    
    
    不是默认文件名的情况下：
    不是默认文件 运行 npx webpack --config + 配置文件的名称

package.json

    script:{
        "bundle":"webpack"  // 会先在本地node_modules中找包，没有再去全局找
    }

	



webpack默认只能打包处理js文件，打包其他文件需要借助loader

loader的使用 执行顺序 从下到上 从右到左 (作用：完成不同文件的打包)

    在配置文件中设置
    module:{
        rules:[
            {
                test:/\.jpg$/, // 打包jpg结尾的文件
                use:{
                    loader:'url-loader|file-loader', // 需要先安装 npm i file-loader -D
                	options:{
                		name:'[name].[ext]'， // 保证打包的名字不变 placeholder占位符
                		outputPath:'images/', // 打包到 dist/images 文件夹中
                		limit:2048,  // 只有url-loader才有此设置
                	}
                }
            }， {
                test:/\.vue$/, //打包vue的文件
                use:{loader:'vue-loader', // 需要先安装 npm i vue-loader -D}
            },{
                test:/\.css$/,
                use:['style-loader','css-loader']
            }
        ]
    }
    
    问题一：file-loader底层执行原理：
    1 先把文件拷贝到打包文件dist目录下，但是名字变化了
    2 给原文件中返回文件路径
    问题二： file-loader 和url-loader的区别
    url-loader:图片在打包文件中生成一个base64的文件，不会额外生成文件，设置limit的作用是，在大于limit值的时候，会和file-loader一样，小于limit值的话，图片打包在输出文件中
    
    问题三：打包css
    style-loader: 把打包文件挂载到head中
    css-loader: 分析多个css之间的关系，从而合并成一段css
    
    引入scss文件
    需要的loader: ['style-loader','css-loader','scss-loader','postcss-loader']
    postcss-loader: 添加厂商前缀
    	配置： 文件中 postcss.config.js
    		module.export = {
                plugins:[
                    require('autoprefixer') ; // 需要安装autoprefixer的插件  npm i autoprefixer -D
                ]
    		}
    	
    	
    css-loader中添加 
    	option:{
    	  importLoader:2, // scss样式中引入的scss，如果不写会直接走css-loader,加上此项话，则先执行下面的2个loader
    	  modules:true, //css模块化，只在引入的文件中起作用 
    	  引入方式 import style from './index.css' 模块引入
    	  		  import  from './index.css' 全局引用
    	}
    	
    打包字体图标的loader
    {
        test:/\.(eot|ttf|svg)$/,
        use:{
            loader:'file-loader
        }
    }
    

 plugins 插件

	作用：可以在webpack运行到某个时刻的时候，帮你做一些事情

    插件一：
    1>安装插件
    npm install -D html-webpack-plugin 
    // 会在打包结束后，自动生成一个HTML文件，并把打包生成的js自动引入到html中
    2>引入插件
    let HtmlWebpackPlugin = require('html-webpack-plugin)
    3>使用插件
    plugins:[new HtmlWebpackPlugin(
    	{
            template:'src/index.html' , //创建一个打包模板
    	}
    )]
    
    插件二：
    clean-webpack-plugin 
    plugins:[new CleanWebpackPulgin(['dist])]
    // 打包前会删除dist下的文件
    
    插件三
    
    

entry和output的基本配置

    entry:'./index.js' ==>entry:{main:'./index.js'}
    多入口打包
    entry:{
        main:'./index.js',
        sub:'./index.js',
    }
    output:{
        publicPath:'http://cdn.com.cn', //引入的文件中加上前缀
        filename:'[name].js', //用占位符打包出mian.js和sub.js文件
        path:path.resolve(__dirname,'dist')
    }

sourceMap配置

是一个映射关系，它知道dist目录文件实际上对应的是src目录那个文件

在开发环境默认配置了sourceMap

未配置，报错，只知道dist目录下错误的行数，并不知道源代码中在哪里报错

    webpack.config.js中
    devtool:'source-map' // 
    cheap-module-eval-source-map // 开发 development
    cheap-module-source-map  // 线上 production
    
    source.map dist中会生成 .map 文件
    inline .map文件会合并到main.js中
    cheap 只报行错不报列错
    module 也会报loader和第三方映射的错误代码
    eval  加快打包速度

webpack-dev-server 开启web服务器  放于电脑内存中

    npm i webpack-dev-server -D 热更新
    1 package.json
       webpack --watch 改变原文件 刷新页面刷新
    2  自动启动服务器，页面自动更新
     devServer:{
         contentBase: './dist', // 服务器的根路径起在哪里
         open:true , // 自动打开服务器地址
         proxy:{
             '/api':'http://localhost:3000' // 是因为webpack使用了 webpack-dev-server
         }
     }
     package.json
     start:"webpack-dev-server"
     
     ===========
     package.json 使用node启动服务
     "middleware":"node server.js"
     
    service.js
    const express = require('express');
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const config = require('./webpack.config.js');
    const complier = webpack(config); // webpack结合配置文件随时做编译
    
    const app = express();
    app.use(webpackDevMiddleware(complier));
    app.listen(3000, () => {
      console.log('App listening on port 3000!');
    });

Hot Module Replacement 热模块替代

    比如：改变页面样式，只改变样式，不从新刷新页面
      方便css，js方便
      html不更新，是因为loader中内置了删除html代码，所以不用自己删除  
    webpack.config.js
    const weback = require('webpack')
    devServer:{
        ...
        hot:true, // 开启 hot module Replacement 功能
        hotOnly:true, // 即使html不生效，也不重新刷新
    }
    plugins:[
        ...,
        new webpack.HotModuleReplacementPlugin()
    ]
    
    
    js代码中
    if(module.hot){ // 如果项目开启了hot module replacement
        module.hot.accept('路径',()=>{
            todo...
        })
    }

weback通过babel识别es6语法 https://babeljs.io/setup

    bable执行顺序 从下往上 从右往左
    @babel/polyfill 识别类似于map，some。promise等es6语法。。。 全部都转义S
    
    webpack中babel配置
    options:{
        presets:[["@babel/preset-env",{
            useBuiltIns:'usage' // 项目中那个ES6组要转化就转那个，不要全部都转移
        }]]
    }
    
    注意：
    写业务代码的时候，可以使用@babel/polyfill，它引入的是全局变量会污染环境；
    写类库代码的时候，要使用@babel/plugin-transform-runtime 它会已闭包的形式引入，不会污染全局变量


