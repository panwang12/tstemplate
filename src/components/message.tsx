  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Message} from "element-ui"
  import Cache from "../utils/cache"
  Vue.prototype.$message = Message
  @Component
    export default class Messages extends Vue{ 
      open(){
        this.$message({
          dangerouslyUseHTMLString:true,
          type:"error",
          // iconClass:"el-icon-edit",
          message:"<p>这是h2</p>",
          duration:1000,
        })
      };
    }
