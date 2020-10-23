import Vue from 'vue';
import Vuex from 'vuex';
import {NumberAdd1,NumberMul} from '../assets/js/math'
Vue.use(Vuex);
var store = new Vuex.Store({
    state:{
        list:JSON.parse(sessionStorage.getItem('shop'))||[],
        arr:{}
    },
    mutations:{
        // 当结算页面的点击删除num--的时候，让菜单页面同步num--
        toggleJian(state,index){
            state.list[index].num--;
        },
        // 点击全部删除，让菜单页面的数量num=0，状态为空，num为1，状态为red
        toggleAll(state){
            state.list.forEach(item=>{
                item.num=0;
            })
            state.list=[];
            // console.log(state.list)
        },
        // 当结算页面的点击删除num《=0的时候，让菜单页面同步num=0
        toggle(state,index){
            state.list[index].num=0;//将仓库中的数据跟当前的数据进行同步
            state.list.splice(index,1);
        },
        add(state,data){
            // console.log(data.k);//点击+的时候，将当前的数据传递到仓库中进行存储
            var index=state.list.findIndex((item)=>{
                return item.id==data.val.id;
            });
            // console.log(index)
            if(data.k == 0 ){//k==0是加，k==1是减
                // data.val.num++;
                if(index>-1){
                    state.list[index].num+=1;
                }else{
                    // data.val.num=1;
                    state.list.push({
                        num:1,
                        id:data.val.id,
                        img:data.val.img,
                        title:data.val.title,
                        price:data.val.price,
                        type:data.val.type
                    });
                }
                
                
            }else{
                // data.val.num--;
                state.list[index].num-=1;
                console.log(state.list[index].num)
                if(state.list[index].num == 0){
                    state.list.splice(index,1);
                }
               
            }
            sessionStorage.setItem('shop',JSON.stringify(state.list));
            
            console.log(state.list);
        },
       
    },
    getters:{
        // 计算金额
        price(state){
            var s = 0;
            state.list.forEach(item=>{
                // s+=NumberMul(Number(item.num),Number(item.price));
                s=NumberAdd1(s,NumberMul(Number(item.num),Number(item.price)))
            })
            // console.log(s)
            return s;
        },
        num(state){
            var s = 0;
            state.list.forEach(item=>{
                s+=Number(item.num);
            })
            return s;
        }
    },
    actions:{

    },
    modules:{

    }
})
export default store;