const mogoose = require('mongoose');

const Schema = mogoose.Schema;

let ObjectId = Schema.Types.ObjectId;

//创建用户的Schema集合表
const userSchema = new Schema({
    user
})