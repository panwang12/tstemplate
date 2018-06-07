import Vue from 'vue';
import {} from 'vuex';
import Component from "vue-class-component";
import {Menu, MenuItem,Submenu,MenuItemGroup} from "element-ui";
import { saveloginUserInfo } from '@/router/index'
import Cache from "@/utils/cache"
import { mapState, mapMutations } from 'vuex'
import { MODULE_PATH } from '@/store/module/login'
import  { checkTocken }  from '@/api/login'
import   SgIcon   from '../SgIcon'

@Component({
  computed: {
    ...mapState(MODULE_PATH, ["isLogin"])
  },
  methods:{
    ...mapMutations(MODULE_PATH, ["changeLoginStatus"])
  }
})
export default class mainMenu extends Vue {
  isLogin:Boolean;
  changeLoginStatus:any;
  render(h){
    if(!this.isLogin){
      return;
    };
    let router:any = this.$router;
   
    console.log(router.options)
    let mainModule = router.options.routes.filter(function(v){
        return v.meta.authorize && v.meta.type=="main"
    });
    let settingModule = router.options.routes.filter(function(v){
      return v.meta.authorize && v.meta.type=="setting"
    });     
    return (<Menu
              default-active="/"
              collapse={true}
              router={true}
              class="el-menu-vertical-demo">
              {mainModule.map((v)=>{
                  return (
                    <MenuItem index={v.path}>
                    <SgIcon name={v.meta.icon} size={24}/>
                    <span slot="title">{this.$t(v.name)}</span>
                  </MenuItem>
                  )
              })}
              <Submenu index="/">
              <template slot="title">
                <SgIcon name="setting" size={24}/>
              </template>
              <MenuItemGroup>
                {settingModule.map((v)=>{
                  return (
                    <MenuItem index={v.path}>{this.$t(v.name)}</MenuItem>
                  );
                })}
              </MenuItemGroup>
              </Submenu>      
            </Menu>)
  }
  mounted(){  
      const accessTocken = Cache.localGet("accessTocken")
      if(accessTocken){
          //TODO 验证accessTocken
          // checkTocken().then((result)=>{
          //   console.log(result)
          //   saveloginUserInfo(result.data.accessToken, {"SG0001":1,"SG0002":2,"SG0003":3,"SG0007":7,"SG0008":8})
          //   this.changeLoginStatus(true)
          // })
      }else{
        //跳转到login页面
        this.$router.push("/login")
      }
  }
}
    
