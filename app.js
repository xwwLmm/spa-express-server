var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var schedule = require('node-schedule');
var fs = require('fs');

fs.readFile("./user.txt","utf8",function (error,data){
    if(error) throw error ;
    console.log(data) ;
}) ;
/**
 * node-cache Test
 */
const NodeCache = require("node-cache");
const myCache = new NodeCache({stdTTL: 100, checkperiod: 120});

var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');
// var validate = require('./routes/validate');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * all方法，每个请求都会执行这个方法，
 * 在此测试重定向
 */
app.all('*', function (req, res, next) {
    /**
     * res.location方法需要重新设置res的请求头状态码
     * statusCode: 301/302
     * @type {number}
     */
    // res.location('users/addUser');
    // res.statusCode = 301;
    // res.end('结束响应的内容');


    /**
     * 测试重定向redirect
     * res.redirect 自身修改请求头的状态码为302
     * 对于SEO来说，302 优于 301
     */
    // res.redirect('users/addUser');
    next(); // pass control to the next handler
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('[^(login)]', function (req, res, next) {
    console.log(myCache.get('owner'));
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/login', function (req, res, next) {
    myCache.set('owner', 'me');
    res.render('login');
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
/**
 * 使用nodemon,感应文件变化，实现热重启
 */
// module.exports = app;
/**
 * 定时任务,用于系统更新或宕机时的恢复
 * @type {any}
 */
// var rule = new schedule.RecurrenceRule();


// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
//
// rule.hour = 20;
//
// rule.minute = 0;
//
// var j = schedule.scheduleJob(rule, function () {
//
//     fs.writeFile('./user.text','123',function(err){
//         if(err) throw err;
//         console.log('has finished');
//     });
//
// });
// var rule = new schedule.RecurrenceRule();
//
// var times = [];
//
// for (var i = 1; i < 60; i += 30) {
//
//     times.push(i);
//
// }
//
// rule.second = times;
//
// var c = 0;
// var j = schedule.scheduleJob(rule, function () {
//     var chunks = new Array();
//     chunks.push({"name": "123"})
//     var data = JSON.stringify(chunks);
//     fs.writeFile("./user.txt", data, function (err){
//         if (err) throw err;
//         console.log("File Saved !"); //文件被保存
//     });
//
// });
app.listen(3000);