<template>
    <div class="leftMuen">
        <ul>
            <!-- <block > -->
            <li v-for="(item,index) in list" :key="index" @click="btn(index)"
             :style="{background:num==index?'red':'',color:num==index?'#fff':''}">
                <i :class="['iconfont icon-'+item.icon]"></i>
                <p>{{item.title}}</p>
            </li>
            <!-- </block> -->
        </ul>
       
    </div>
</template>
<script>
export default {
    name:'left',
    data(){
        return{
            list:[
                {icon:'dianpu',title:'菜单'},
                {icon:'shouyin',title:'结算'},
                {icon:'shangpin',title:'商品'},
                {icon:'huiyuan-',title:'会员'},
                {icon:'tongji',title:'统计'},
            ],
            num:0
        }
    },
    created(){
       
    },
    methods:{
        btn(k){
            // vue-router升级为3.0.1，
            // 使用编程式导航多次点击同一个路由会报错，
            // 要加catch捕获或者退回版本或者在main中处理
        //    console.log(this.$route)
            
            // if(this.$router.)
            this.$router.push({
            path:`/home/menu${k}`
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    watch:{
        '$route':{
            handler(newValue){
               var a = newValue.name;
               var b = a.slice(a.length-1)
            //    console.log(b)
               this.num = b;
            },
            deep:true,
            immediate: true
        }
    }
   
}
</script>
<style scoped>
    .leftMuen{
        box-sizing: border-box;
        height: 100%;
        width: 10%;
        /* padding:0 0 20px; */
        border-right: 1px solid #000;
    }
    .leftMuen ul{
        text-align: center;
    }
    .leftMuen ul li{
        cursor: pointer;
        height: 80px;
        border-bottom: 1px solid #000;
    }
    .leftMuen ul li:hover{
        background: #ccc;
    }
    .leftMuen ul li i{
        display: block;
        font-size: 30px;
        padding: 10px 0 10px;
    }
</style>