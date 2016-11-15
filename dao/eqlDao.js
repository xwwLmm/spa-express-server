/**
 * Created by xieww on 2016/11/15.
 */

var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./eqlSqlMapping');

var pool = mysql.createPool($util.extend({}, $conf.mysql));

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO eql(id) VALUES(?)',
            connection.query($sql.insert, [param.id], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    }
};