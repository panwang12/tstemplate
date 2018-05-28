
  import Vue from 'vue'
  import { getSystemName } from '../ajax/axios'
  import Component from 'vue-class-component'

  @Component
    export default class page1 extends Vue{
      mounted(){
        getSystemName('wangpan').then((req)=>{
          console.log(req.data)
          this.$store.commit("changeSystemName",req.data)
        })
      }
      msg="这是我的master分支"
        get systemName():string{
            return this.$store.state.a.name
        }
      render(h){
         return (
            <div>
            <p>{this.msg}</p>
           </div>
          )
        }
    }
