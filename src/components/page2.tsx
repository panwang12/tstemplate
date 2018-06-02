
  import Vue from 'vue'
  import { getSystemName } from '../ajax/axios'
  import Component from 'vue-class-component'
  import {Switch, Button, Message, DatePicker} from "element-ui"
  import Cache from "../utils/cache"
  Vue.prototype.$message = Message
  @Component
    export default class page1 extends Vue{
      v2=true;
      open(){
        this.$message({
          dangerouslyUseHTMLString:true,
          type:"error",
          // iconClass:"el-icon-edit",
          message:"<p>这是h2</p>",
          duration:1000,
        })
      };
      changeLanguage(){
        let language = Cache.localGet("language")
        language==="en"? Cache.localSet("language","zh"): Cache.localSet("language","en")
        window.location.reload()
      };
      munted(){
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
            <Switch
              value={this.v2}
              onInput={val => (this.v2 = val)}
            >
            </Switch>
            <Button onClick={this.open}>
                打开消息提示
            </Button>
            <h2>时间选择器</h2>
            <DatePicker
              type="date"
              placeholder="选择日期">
            </DatePicker>
            <div>
              <h2>国际化</h2>
              <Button onClick={this.changeLanguage}>切换语言</Button>
              <p>{this.$t("message.name")}</p>
              <p>{this.$t("message.country")}</p>
            </div>
            
           </div>
          )
        }
    }
