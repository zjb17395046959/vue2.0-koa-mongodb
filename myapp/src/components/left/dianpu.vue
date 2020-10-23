<template>
    <div class="dianpu">
       <nav>
            <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="sort"
                label="排序"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="菜名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="num"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="price"
                label="价格">
            </el-table-column>
            <el-table-column
                prop="operate"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" round @click.native.prevent="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       </nav>
        <footer>
            <b style="margin-left:30px;">合计：{{price}}元</b>
            <b style="margin-left:30px;">数量：{{num}}份</b>
             <el-button type="danger" @click="dele" style="float:right;">全部删除</el-button>
        </footer>
    </div>
</template>
  <script>
import {NumberAdd1,NumberMul} from '../../assets/js/math'
  import {mapState, mapGetters } from 'vuex'
    export default {
      data() {
        return {
          tableData: [],
          list:JSON.parse(sessionStorage.getItem('shop'))||[]
        //   list:this.$store.state.list
        }
      },
      mounted(){
            //   将仓库中的数据进行格式化处理并赋值渲染到页面上
        var s = 0 ;
        this.list.forEach(item => {
            s++;
            var obj = {
                sort: s,
                name : item.title,
                num : item.num,
                price : item.price
            };
            this.tableData.push(obj);
        });
        // console.log(this.tableData);
        
      },
      methods:{
          handleDelete(index,rows){
            //   index当前行的下标，rows当前行的数据
            //   console.log(index);
            //   console.log(rows);
            if(rows.num<=1){
                this.tableData.splice(index,1);//赋值当前新的数组，但是也要让原来的数组中的数据进行改变
                this.list[index].num=0;
                this.list.splice(index,1);
                this.$store.commit('toggle',index);//将仓库中的数据跟当前的数据进行同步
                sessionStorage.setItem('shop',JSON.stringify(this.list));
            }else{
                rows.num--;
                this.list[index].num--;
                 this.$store.commit('toggleJian',index);//将仓库中的数据跟当前的数据进行同步
                 sessionStorage.setItem('shop',JSON.stringify(this.list));
            }
              
          },
          dele(){
              this.tableData=[];
              this.list=[];
              // this.$store.commit('toggleAll');//将仓库中的数据跟当前的数据进行同步
              sessionStorage.setItem('shop',JSON.stringify(this.list));
          }
      },
      computed:{
          // ...mapState(['list']),//将store中的数据同步到这个页面中，直接通过this.list调用
          // ...mapGetters(['tableData'])
          // 计算金额
          price(){
              var s = 0;
              this.list.forEach(item=>{
                  // s+=NumberMul(Number(item.num),Number(item.price));
                  s=NumberAdd1(s,NumberMul(Number(item.num),Number(item.price)))
              })
              // console.log(s)
              return s;
          },
          num(){
              var s = 0;
              this.list.forEach(item=>{
                  s+=Number(item.num);
              })
              return s;
          }
      },
      watch:{
        // 'list'(newValue,oldValue){
        //   console.log(newValue);
        //   console.log(oldValue);
        // }
      }
    }
  </script>
  <style scoped>
  .dianpu{
      width:800px;
      height:100%;
      display:flex;
      flex-direction: column;
      border-right: 1px solid #000;
  }
  nav{
      flex: 1;
      overflow: auto;
  }
  footer{
    padding: 0 20px;
    height: 40px;
    line-height: 40px;
    border-top: 1px solid #000;
}
  </style>