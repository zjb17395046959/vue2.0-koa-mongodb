const mongoose = require('mongoose');
const db = 'mongodb://localhost/simle-db';

mongoose.Promise = global.Promise;

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db);

    //增加数据库连接事件的监听事件
    mongoose

}