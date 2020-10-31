const mongoose = require('mongoose');
//simle-db这是数据
const db = 'mongodb://localhost/simle-db';
const glob = require('glob');
const {resolve} = require('path');
mongoose.Promise = global.Promise;

exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db);

    let maxConnectTimes = 0;
    return new Promise((resolve,reject)=>{

    //增加数据库连接事件的监听事件
    mongoose.connection.on('disconnected',()=>{
        //进行重连
        if(maxConnectTimes<3){
            maxConnectTimes++;
            mongoose.connect(db);
        }else{
            reject();
            throw new Error('数据库出现问题，程序无法搞定，请人为2修理。。。');
        }
       
    })

    //数据库出现错误的时候
    mongoose.connection.on('error',err=>{
        console.log(err);
        if(maxConnectTimes<3){
            maxConnectTimes++;
            mongoose.connect(db);
        }else{
            reject();
            throw new Error('数据库出现问题，程序无法搞定，请人为2修理。。。');
        }
    })

    //连接打开的时候
    mongoose.connection.once('open',()=>{
        console.info('打开啦');
        resolve();
    })
    })

}
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}