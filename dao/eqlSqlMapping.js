/**
 * Created by xieww on 2016/11/15.
 */

var eql = {
    insert:'INSERT INTO eql(id) VALUES(?)',
    update:'update eql set id=? where id=?',
    delete: 'delete from eql where id=?',
    queryById: 'select * from eql where id=?',
    queryAll: 'select * from eql'
};

module.exports = eql;
