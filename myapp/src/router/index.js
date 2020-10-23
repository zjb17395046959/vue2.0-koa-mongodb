import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

var router=new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:'menu0',
          name:'menu0',
          component:()=>import("@/components/left/shouyin.vue"),
          meta:{
            title:'餐单页',
            keep:true
          }
        },
        {
          path:'/home',
          redirect:'/home/menu0'
        },
        {
          path:'menu1',
          name:'menu1',
          component:()=>import("@/components/left/dianpu.vue"),
          meta:{
            title:'餐单列表页',
            keep:false
          }
        },
        {
          path:'menu2',
          name:'menu2',
          component:()=>import("@/components/left/shop.vue"),
          meta:{
            title:'商品页',
            keep:false
          }
        },
        {
          path:'menu3',
          name:'menu3',
          component:()=>import("@/components/left/huiyuan.vue"),
          meta:{
            title:'会员',
            keep:false
          }
        },
        {
          path:'menu4',
          name:'menu4',
          component:()=>import("@/components/left/tongji.vue"),
          meta:{
            title:'统计',
            keep:false
          }
        }
      ]
    },
    {
      path:'*',
      component:()=>import('@/components/page.vue')
    },
    {
      path:'/login',
      name:'login',
      component:()=>import('@/components/login.vue')
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta.title){
    document.title=to.meta.title;
  }
  var token = localStorage.getItem('token');
  if(!token&&to.path!="/login"){
    next({
      path:'/login'
    })
  }else if(to.path=="/login"){
    localStorage.removeItem('token');
  }
  next();
})
export default router