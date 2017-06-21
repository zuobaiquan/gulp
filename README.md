### 为什么要前端自动化

> 在前端开发实践中，大公司都会有自己的基础前端架构，能容包括了开发环境、代码管理，代码质量，性能检测，命令行工具，开发规范，开发流程，前端架构及性能优化。相对而言，小公司或则是创业型的公司，前端架构这块做得就相对没有这么好，甚至于很不规范，而规范的目的在于提升工作效率。

而规范需要一定的过程，我们就先从代码质量，代码管理上入手。

>1. 对代码（html，css，js）进行语法检查
>2. 对图片，代码进行压缩
>3. 对sass。less 的css预处理器进行编译
>4. 期望代码有改动后，能自动刷新页面
>5. ...

这些操作，我们可以通过人工来完成，但是效率真的低到没朋友。

在项目自动化构建工具中，目前用的比较多的是`grunt`，`gulp`。与这些自动化工具配套的包管理工具呢，通常还有`npm`。`node`包含了`npm`的包，所以只要系统里安装了 `node`，就可通过 npm install 来安装需要的项目依赖。当然现在流行起来的还有 `webpack` 模块管理工具

## 1. 安装nodejs

- 去 [https://nodejs.org/en/](https://nodejs.org/en/)下载安装文件安装即可。
- 安装完成后，在终端输入`node -v`回车打印出nodejs的版本号，说明nodejs安装成功。
- 在终端输入`npm -v`
  回车打印出npm的版本号，说明npm也安装成功(node安装包中已集成了npm,因此在安装nodejs的同时也安装了npm)。

## 2. 设置npm

由于[https://www.npmjs.com](https://www.npmjs.com/)在国内访问不稳定，因此建议使用国内镜向站点[https://npm.taobao.org](https://npm.taobao.org/)
具体方法如下：

- 通过config命令

  npm config set registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org/)

- 命令行指定

  npm --registry [https://registry.npm.taobao.org](https://registry.npm.taobao.org/) info underscore

- 编辑 npmrc文件，在该文件中加入registry = [https://registry.npm.taobao.org](https://registry.npm.taobao.org/)

> 这个在windows下找到了npmrc。 mac下暂时还没找到。

## 3. 安装gulp(全局)

- 在终端输入`npm install gulp -g`
- 安装完成后，同样输入`gulp -v`输出相应的版本号，则说明安装成功。

至此gulp安装完成

------

## 4. 配置项目

下面以一个简单案例来做演示：创一个gulp文件夹作为项目根目录，项目结构如下：!

![img](https://segmentfault.com/img/bVvRcE)



我们以常用的 gulp-uglify、gulp-concat、gulp-minify-css为例。
先是配置package.json文件，有三种方法：

>- 可以用记事本之类的创建一个
>- 用npm init命令（npm init 在项目中引导创建一个package.json文件）
>- 也可以复制之前项目的创建好的 package.json

我们用npm init 的方法来创建package.json（安装包的信息可保持到项目的package.json文件中，以便后续的其它的项目开发或者他人合作使用）

在终端将当前目录切换至项目所在目录，然后输入`npm init`，一路回车，最终在项目根目录下生成package.json:

```bash
{
  "name": "gulp_test", /*项目名,切记这里命名不要与模块一样，如命名为gulp，要是安装gulp时就会出错*/
  "version": "1.0.0", /*版本号*/
  "description": "", /*描述*/
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "", /*作者*/
  "license": "ISC" /*项目许可协议*/
}
```

> 注释是额外加的，npm init 生成是没有注释的，而且json文件也不支持注释，这点得注意！

## 5. 本地安装gulp及gulp插件

### 本地安装gulp

```bash
npm install gulp --save-dev
```

安装完成后，我们再看项目中的变化：如图：

1. gulp模块下载到项目中的node_modules文件夹中。
2. package.json中写入了devDependencies字段，并在该字段下填充了gulp模块名

> --svae-dev 的作用就是将刚才安装的模块写入package.json中。

![img](https://segmentfault.com/img/bVvRcH)

> 大家可能会觉得有些奇怪，刚不是安装了gulp吗？对，那是全局安装，为的是能在端终运行gulp任务的，这里是项目级别的安装，真正的gulp模块安装到项目的node_modules/下了，后面的插件都是依赖gulp模块的。
>
> 新建`gulpfile.js`配置文件放在项目根目录下，整个项目目录结构如下:

```
.
├── .git            通过git进行版本控制,项目自动生成这个文件
├── node_modules    组件包目录
├── dist    **发布环境**
│   ├── css        样式文件(style.css style.min.css)
│   ├── images            图片文件(压缩图片/合并后的图片)
│   ├── index.html    静态页面文件(压缩html)
│   └── js        js文件(main.js main.min.js)
├── gulpfile.js           gulp配置文件
├── package.json    依赖模块json文件,在项目目录下npm install会安装项目所有的依赖模块，简化项目的安装程序
└── src        **开发环境**
    ├── images        图片文件
    ├── index.html    静态文件
    ├── js        js文件
    └── sass        sass文件
```

### 本地安装gulp插件

接下来安装上面提到的三个插件,在终端中输入
`npm install --save-dev gulp-uglify gulp-concat gulp-minify-css`
安装完成，如下图

![img](https://segmentfault.com/img/bVvRcM)

## 6. 创建gulpfile.js文件

在项目根目录下创建gulpfile.js文件，然后编写如下代码，这些代码没什么好解释的，具体可以参考[gulp的api](http://www.gulpjs.com.cn/docs/api/)

```javascript
// 引入gulp
var gulp = require('gulp');
// 引入组件
var jshint = require('gulp-jshint');//检查js
//注意 安装npm install --save-dev jshint gulp-jshint,不能执行npm install --save-dev gulp-jshint，否则报错
var sass   = require('gulp-sass');  //编译Sass
var concat = require('gulp-concat');//合并
var uglify = require('gulp-uglify');//压缩JS
var rename = require('gulp-rename');//重命名
// 检查js脚本的任务
//jshint是用来检测javascript的语法错误的，在grunt和gulp都有这个插件
gulp.task('lint', function() {
    gulp.src('./js/*.js') //可配置检查脚本的具体名字
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
// 编译Sass
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});
// 合并，压缩js文件
// 找到js/目录下的所有js文件，合并、重命名、压缩，最后将处理完成的js存放在dist/js/目录下
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
        console.log('gulp task is done');//自定义提醒信息
});
.... // 其他任务类似
// 定义默认任务,执行gulp会自动执行的任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');
    // 监听js文件变化，当文件发生变化后会自动执行任务
    gulp.watch('./js/*.js', function(){
        gulp.run('lint','scripts');
    });
});
```

> 实际的项目肯定没这么简单，想想我们一般不可能对某几个文件操作，应该是对一批文件操作，那样的涉及到文件匹配的问题了，暂时不展开了。

### gulpfile.js配置

gulp有4个属性，即 src，dest，watch，task

> **官方API**        
>
> ​	gulp.task(name[, deps], fn)       
>
> ​	gulp.src(globs[, options])        
>
> ​	gulp.dest(path[, options])       
>
> ​	gulp.watch(glob [, opts], tagulpsks)

例子，在gulpfile.js中写入下列几行代码，对gulp的4个属性一一解释

```javascript
/*引入gulp及相关插件 require('node_modules里对应模块')*/
var gulp = require('gulp');
var minifyCss = require("gulp-minify-css");
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

//压缩
gulp.task('minify-css', function () {  //1
    gulp.src('./css/*.css')            //2 
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css/')); 
});
//
gulp.task('script', function () {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))        //3 
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('default',['minify-css','script']); 
```

**//1. gulp.task('default',function(){ } **    这个API用来创建任务，在命令行下可以输入$ gulp default来执行上面的任务。

gulp.task(name[, deps], fn)     参数说明    

第一个参数name是自定义你的任务名称，
第二个参数[deps]是一个数组，里面是你定义的其他任务的名称，这些任务会在本次定义的任务之前执行并完成。
第三个参数fn是本次任务的回调函数。

举个栗子：

```javascript
//执行gulp task1 命令执行task1的任务
gulp.task('task1',function(){
    console.log("task1 done");
});
//执行gulp task2 命令执行task2的任务
gulp.task('task2',function(){
    console.log("task2 done");
});
//执行gulp task3 命令执行task3的任务
gulp.task('task3',function(){
    console.log("task3 done");
});
//执行gulp build 命令同时执行task1、task2、task3三个任务
gulp.task('build',['task1','task2','task3'],function(){
    console.log("build done");
});
```

![](http://files.cnblogs.com/files/zuobaiquan01/QQ%E6%88%AA%E5%9B%BE20170508114934.bmp)

**//2.gulp.src('./src/css/*.css')**

> 这个API获得要处理的文件源路径 官方API `gulp.src(globs[, options])`

globs是一个匹配模式，如gulpfile.js中写的 gulp.src('./src/css/*.css')
`'./src/css/*.css'`匹配同层路径下src目录下的css目录下的所有以.css结尾的文件
更多的匹配模式可以参考官方文档。
globs类型：String 或者 Array。string则说明它匹配单一模式。array表示它可以传入数组多个匹配字段，如['./src/css/index.css','./src/css/pomelo.css']
[options]是可选的。主要是两个，options.base----匹配的根目录，options-read

参数详情：http://www.jianshu.com/p/7e89f01e2d91

```javascript
js/sample.js    //精确匹配文件
js/*.js              //匹配js目录下的所有js文件
js/**/*.js          //匹配js目录及其子目录下所有后缀为.js的文件
!js/sample.js   //从匹配结果中去除js/sample.js文件
 *.+(js|css)      //匹配根目录下所有后缀为.js或者.css的文件

//例如：匹配js目录及其子目录下所有js文件，但需要去除后缀为.min.js的文件
gulp.src(['js/**/*.js', '!js/**/*.min.js'])
```

**//3 .pipe(concat('all.js'))**

pipe( ) 方法是正如字面意思理解的那样，把一个文件流输入，通过pipe管道输出，

> 下一个处理程序可以把上一级输出的流文件当做输入

这样可以实现文件流的高效处理,我认为这种方法很像jquery的写法。能够进行链式调用处理。
那么毫无疑问，第三段的代码 .pipe(concat('all.js'))   的意思就是把获取到匹配`gulp.src()`字段的文件通过`pipe`管道进入插件`gulp_concat()`的处理程序，并且合并后的文件名为`index.min.css`
这里插件`gulp_concat`是文件合并的插件，详细的使用方法请在gitbub或者npm网站中找到相关的api文档。

## 7. 运行gulp

可以看到，我们在gulpfile.js创建了3个任务，其实是两个，最后一个是合并上面两个任务。然后我们就可以在终端来运行上面的作务了，在终端输入

```
gulp minify-css
```

运行结果如下图：在dist/css/目录下生成了我们压缩后的css文件。
![img](https://segmentfault.com/img/bVvRbc)

## 8. 用webStrom运行

到目前为至，大家基本知道gulp在项目中的运用了，只少基本流程是没问题了。但是，时刻使用终端还是不怎么方便的，下面我们直接在webStrom中运行上面的gulp任务。
在webStrom中打开gulpfile.js文件 》右键选择 Show Gulp Tasks 》Gulp面板上已经列出gulpfile.js创建的任务 》选中任务运行即可。
是不是非常方便!

![img](https://segmentfault.com/img/bVvRbt)

## 小结

看似步骤不少，其实没几步，我们是从零开如说起的主要是为了演示整个过程理解其中的原理，对于一般用户来说，nodejs npm应该早装好了。其实我们主要需要做的如下：

1. 创建package.json，上面我们使用的 npm init方法，实际操作中我们一般是把之前创建好的package.json直接拿过来，放到项目根目录下，然后 npm install 一下，这样我们要用到的gulp插件自动就安装好了。
2. 编写gulpfile.js,gulp就那么些api，我们常用到的可能就那些插件，所以我们完全可以编写一个gulpfile.js然后在此基础上修改一下就行了。

转自 ： https://segmentfault.com/a/1190000005170434





### 从零开始搭建 gulp 前端自动化

1. 安装node.js
2. npm init 生成package文件，或则你可以自己手动生成
3. 在控制台中输入` npm install --save-dev gulp`命令，在项目中安装gulp
4. 配置gulp任务
5. 在控制台中输入 `gulp`或则`gulp default`测试你的gulp任务
6. 配置你真正需要的 gulp 任务，（压缩，代码质量检查，浏览器自动刷新）

```
var gulp = require('gulp');
gulp.task('default',function(){
    console.log("hello")
});

```

```
#####浏览器自动刷新

```

1. 在你的谷歌浏览器里安装插件。关键字`livereload`

2. 通过命令`mpn install gulp-livereload --save-dev`来安装依赖

3. 在gulp文件中引入`livereload = require('gulp-livereload'),`

4. 在gulp的`watch`任务中通过 `livereload.listen([options])`启动刷新服务

5. 定义的任务在最后加入一个工作流`.pipe(livereload())`,

6. 在启动后进入到这个任务后，开启谷歌插件，就能自动刷新浏览器了

   \#gulpfile.js 文件

   ```
      var gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      livereload = require('gulp-livereload'),

   ```

   gulp.task('test',function() {

   ```
      return gulp.src('js/test.js')
          .pipe(uglify())
          .pipe(gulp.dest('build'))
          .pipe(livereload())
   ```

   });

   gulp.task('watch',function(){

   ```
      livereload.listen();
      gulp.watch('js/test.js', ['test']);
   ```

   });

   当你修改你的test.js 文件之后，ctrl + s 保存，你就可以看到时时刷新。

7.代码压缩

```
1.通过命令`mpn install gulp-uglify --save-dev`来安装依赖(js 压缩)
2.通过命令`mpn install gulp-concat --save-dev`来安装依赖(合并压缩后的文件到一个文件)

    #gulpfile.js 文件

    uglify = require('gulp-uglify'),

    gulp.task('compress',function(){
    return gulp.src('js/servers/*.js')
        .pipe(uglify())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload())
});

```

8.同理css压缩，生成雪碧图等task，代码质量检查，都是同样的先安装依赖，再引用，编写task

**如果你想深入学习**

[我理想中的前端工作流](https://segmentfault.com/a/1190000004638228)
[gulp 中文网](http://www.gulpjs.com.cn/)
[livereload](https://scotch.io/tutorials/a-quick-guide-to-using-livereload-with-gulp)
[gulp-livereload](https://www.npmjs.com/package/gulp-livereload)ulp-livereload)

转自：https://segmentfault.com/a/1190000004827966



livereload自动化刷新

## 前言

正如上图所示，使用 `gulp-livereload`，可以实时保存刷新，那样就不用按F5和切换界面了，无形中省了好多时间，有没有！：D

- Gulp.js：比 `Grunt` 更简单的`自动化项目构建工具`
- gulp-livereload：顾名思义，这是 Gulp.js 中的`其中一个插件`，本文的主题就是它了。

## 安装

第一步：`全局安装`gulp 和 `当前目录部署` gulp 和 gulp-livereload

```
npm install gulp -g
npm install gulp gulp-livereload --save-dev
```

第二步：安装 `chrome` 插件，[点我就去安装](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

## 使用

第一步： 当前目录新建 `gulpfile.js` 文件，写入以下代码。

```
var gulp = require('gulp'),
    livereload = require('gulp-livereload');

gulp.task('watch', function () {    // 这里的watch，是自定义的，写成live或者别的也行
    var server = livereload();
    
    // app/**/*.*的意思是 app文件夹下的 任何文件夹 的 任何文件
    gulp.watch('app/**/*.*', function (file) {
        server.changed(file.path);
    });
});
```

第二步： 命令行下运行

```
gulp watch
```

此时，你会发现当你修改 `app` 文件夹下的任何文件，命令行都会有内容输出，说明能够监控到文件的变化，运作正常了。

第三步： 以服务器的方式打开页面，例如 `localhost:3000`，而不是 `file:///F:/web/app/index.html`接着点击刚刚安装的 `chrome插件` ，中间变为实心黑色圆点表示开始运作了。

![img](http://think2011.qiniudn.com/gulp-livereload2.gif)

**现在只要文件一保存，浏览器就会马上刷新了。**