const mogoose = require('mongoose');

const Schema = mogoose.Schema;

let ObjectId = Schema.Types.ObjectId;

//创建用户的Schema集合表
const userSchema = new Schema({
    userId:ObjectId,
    userName:{unique:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
})

//lists集合写入成功了，但是数据没有
const listSchmea = new Schema({
    list:Array
})

mogoose.model('list',listSchmea);
//发布类型
mogoose.model('User',userSchema);