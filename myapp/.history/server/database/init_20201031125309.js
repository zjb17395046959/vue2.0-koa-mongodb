const mongoose = require('mongoose');
const db = 'mongodb://localhost/simle-db';

mongoose.Promise = global.Promise;

exports.connect = ()=>{
    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{
            //连接数据库
    mongoose.connect(db);

    //增加数据库连接事件的监听事件
    mongoose.connection.on('disconnected',()=>{
        //进行重连
        if(maxConnectTimes<3){
            maxConnectTimes++;
            mongoose.connect(db);
        }else{
            reject();
            throw new Error('数据库出现问题，程序')
        }
       
    })

    //数据库出现错误的时候
    mongoose.connection.on('error',err=>{
        console.log(err);
        mongoose.connect(db);
    })

    //连接打开的时候
    mongoose.connection.once('open',()=>{
        console.info('打开啦');
    })
    })

}