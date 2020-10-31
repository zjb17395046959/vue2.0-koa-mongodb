//引入database文件
const { connect , initSchemas} = require('./database/init');
const mongoose = require('mongoose');
//立即执行函数，将数据存储到数据库中，并且在从数据库中读取数据
;(async ()=>{
    await connect();
    initSchemas()
    //获取模型
    const User = mongoose.model('User')
    //插入数据到模型中
    let oneUser = new User({userName:'jspang',password:'123456'})
    oneUser.save().then(()=>{
        console.log('插入成功')
    })
    //读取数据，users是集合名，db.users.find()//找到当前集合的
    let users = await User.findOne({}).exec();
    console.log(users);
})()


const Koa = require('koa');//引入koa模块
const app = new Koa();//调用模块中的方法并进行声明

const cors = require('koa2-cors');//中间件，解决跨域问题
app.use(cors());//注册

const Router = require('koa-router');//路由中间件

const bodyparser = require('koa-bodyparser');//post请求数据处理格式的中间件
app.use(bodyparser());//注册

let home = new Router();//这是声明前缀不同的路由http://localhost:3000/home/menu0
home.get('/menu0', async (ctx)=>{
    //get 使用query进行接受，post使用body进行接受
    // 这是我们接受到前台传递的数据， 可以将这条数据进行处理或者是写入到mongodb数据库中
    console.log(ctx.request.query);
    //当前台请求当前数据的时候，成功了，后台返回给前台的响应，前台请求数据中的data中就会进行显示加提示这条信息
    // ctx.body = JSON.stringify(ctx.request.query);
    ctx.body = '请求数据写入成功啦';
});
home.get('/a', async(ctx)=>{//http://localhost:3000/home/a
    console.log(ctx.request.query);
    // ctx.body = 'ctx.request.query';
    let list = [
        { id : 1, title : "我是数据列表1", sex : 0 },
        { id : 2, title : "我是数据列表2", sex : 1 },
        { id : 3, title : "我是数据列表3", sex : 2 },
        { id : 4, title : "我是数据列表4", sex : 3 },
        { id : 5, title : "我是数据列表5", sex : 4 },
        { id : 6, title : "我是数据列表6", sex : 5 },
        { id : 7, title : "我是数据列表7", sex : 6 }
    ]
    ctx.response.body = list;
    // ctx.response.body=({
    //     title:'我是后台返给前台的数据',
    //     content:'快点接受数据',
    //     status:200
    // });
});

let page = new Router();
page.post('/a', async(ctx)=>{//http://localhost:3000/page/a
    // 输入localhost:3000/page/a页面会提示405，找不到post的方法
    //原因为 Apache、IIS、Nginx等绝大多数web服务器，都不允许静态文件响应POST请求
    // 所以将post请求改为get请求即可
    // 还有在前台请求数据的时候，其实post已经执行了
    ctx.body = ctx.request.body;
});

let router = new Router();//这是声明总的路由
//将上面写的home及page路由进行再主路由上注册
router.use('/home',home.routes(),home.allowedMethods());
router.use('/page',page.routes(),page.allowedMethods());

// 在将主路由注册到koa中就可以了
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000,()=>{//http://localhost:3000这是当前服务器的端口号
    console.log('服务器启动成功！');//会在cmd命令符中显示这句话提示我们
});