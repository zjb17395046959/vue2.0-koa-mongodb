<template>
    <div class="shouyin">
        <ul>
            
            <li v-for="(item,index) in arr" :key="index">
                <p class="nav">{{index}}:</p>
                <div class="nav-flex">
                    <div v-for="(val,idx) in item" :key="idx" class="content">
                        <img :src="val.img" alt="图片">
                    <div class="content-one">
                        <p>{{val.title}}</p>
                        <p>￥:{{val.price}}元</p>
                    </div>
                    <div class="content-num">
                        <span :style="{background:val.num==0?'#ccc':''}"
                        @click="jian(val)">-</span>
                        <span>{{val.num}}</span>
                        <span @click="jia(val)" :class="val.num>0?'active':''">+</span>
                    </div>
                    </div>
                </div>
            </li>
            
        </ul>
        <!-- 底部固定导航 -->
        <footer>
            <b>合计：{{$store.getters.price}}元</b>
            <b>数量：{{$store.getters.num}}份</b>
            
        </footer>
    </div>
</template>
<script>
export default {
    name:'shouyin',
    data(){
        return{
            list:[
                {id:1,type:"面食",title:"刀削面",price:1.1,img:require('../../assets/img/main.jpg'),num:0},
                {id:2,type:"面食",title:"手擀面",price:1.2,img:require("../../assets/img/mian.jpg"),num:0},
                {id:3,type:"面食",title:"臊子面",price:0.1,img:require("../../assets/img/mian2.jpg"),num:0},
                {id:4,type:"面食",title:"拌面",price:0.2,img:require("../../assets/img/mian3.jpg"),num:0},
                {id:5,type:"米食",title:"盖饭",price:20,img:require("../../assets/img/mi1.jpeg"),num:0},
                {id:6,type:"米食",title:"蛋炒饭",price:20,img:require("../../assets/img/mi2.jpg"),num:0},
                {id:7,type:"米食",title:"黄焖鸡米饭",price:20,img:require("../../assets/img/mi3.jpg"),num:0},
                {id:8,type:"汤类",title:"紫菜汤",price:10,img:require("../../assets/img/tang1.jpg"),num:0},
                {id:9,type:"汤类",title:"鸡蛋汤",price:12,img:require("../../assets/img/tang2.jpg"),num:0},
                {id:10,type:"汤类",title:"乌鸡汤",price:20,img:require("../../assets/img/tang3.jpg"),num:0},
                {id:11,type:"面食",title:"刀削面1",price:20,img:require('../../assets/img/main.jpg'),num:0},
                {id:12,type:"面食",title:"手擀面1",price:20,img:require("../../assets/img/mian.jpg"),num:0},
                {id:13,type:"面食",title:"臊子面1",price:20,img:require("../../assets/img/mian2.jpg"),num:0},
                {id:14,type:"面食",title:"拌面1",price:20,img:require("../../assets/img/mian3.jpg"),num:0},
                {id:15,type:"米食",title:"盖饭1",price:20,img:require("../../assets/img/mi1.jpeg"),num:0},
                {id:16,type:"米食",title:"蛋炒饭1",price:20,img:require("../../assets/img/mi2.jpg"),num:0},
                {id:17,type:"米食",title:"黄焖鸡米饭1",price:20,img:require("../../assets/img/mi3.jpg"),num:0},
                {id:18,type:"汤类",title:"紫菜汤1",price:10,img:require("../../assets/img/tang1.jpg"),num:0},
                {id:19,type:"汤类",title:"鸡蛋汤1",price:12,img:require("../../assets/img/tang2.jpg"),num:0},
                {id:20,type:"汤类",title:"乌鸡汤1",price:20,img:require("../../assets/img/tang3.jpg"),num:0},
                {id:21,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'香辣鸡腿堡',price:18,num:0},
                {id:22,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'田园鸡腿堡',price:18,num:0},
                {id:23,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'和风汉堡',price:18,num:0},
                {id:24,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'快乐全家桶',price:18,num:0},
                {id:25,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'魔法鸡块',price:18,num:0},
                {id:26,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'雪顶咖啡',price:18,num:0},
                {id:27,type:"汉堡",img:require("../../assets/img/tang2.jpg"),title:'大块鸡米花',price:18,num:0}
            ],
            arr:{},
            arrNum:JSON.parse(sessionStorage.getItem('shop'))||[]
              
            
        }
    },
    created(){
        var obj = {}
        var a;
        this.list.forEach(item => {
            a = item.type;
            // console.log(a)
            var b = this.list.filter(item=>{
                return item.type==a
            });
            // console.log(b);
            obj[a]=b;
            
        });
        this.arr=obj;
        // console.log(obj);
        // 初始化的时候，有数据就让菜单页面的+按钮为red，没有的时候，为未点击的状态
        var arr = JSON.parse(sessionStorage.getItem('shop'))||[]
        for (const key in obj) {
           obj[key].forEach(item=>{
               var aa = arr.find(val=>{
                   return item.id==val.id
               })
               if(aa){
                   item.num=aa.num
               }
           })
        }
    },
    methods:{
        jia(val){
            var k = 0;
            val.num++;
            this.$store.commit('add',{val,k});
            // console.log(JSON.stringify(val,null,2))
        },
        jian(val){
            if(val.num==0){
                this.$message('最少选择一份订单');
                return;
            }
            val.num--;
            var k = 1;
            this.$store.commit('add',{val,k});
        }
    }
}
</script>
<style scoped>
.shouyin{
    width: 800px;
    height: 100%;
    border-right: 1px solid #000;
    display: flex;
    flex-direction: column;
}
.shouyin ul{
    flex: 1;
    overflow: auto;
}
::-webkit-scrollbar{width:0;}
.shouyin ul li{
    padding: 20px 20px;
    /* display: flex; */
}
.nav{
    font-weight: bold;
}
.nav-flex{
    display: flex;
    flex-wrap: wrap;
}
.content{
    width: 30%;
    padding: 10px 10px;
    border-radius: 10px;
    border:1px solid #000;
    display: flex;
    align-items: center;
    margin:10px;
}
.content>img{
    width: 40px;
    height: 40px;
    border-radius: 6px;
}
.content-one{
    flex: 1;
    padding-left: 20px;
}
.content-num{
    /* border: 1px solid #000; */
}
.content-num>span{
    cursor: pointer;
    display:inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #000;
}
.content-num>span:nth-child(2){
    border:none;
    margin: 0 2px;
}
footer{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #000;
}
.active{
    background:red;
    color: #fff;
}
</style>