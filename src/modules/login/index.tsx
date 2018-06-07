import Vue from 'vue';
import {} from 'vuex';
import Component from "vue-class-component";
import {Form, FormItem, Input, Button } from "element-ui";
import Cache from "@/utils/cache"
import { mapState, mapMutations } from 'vuex'
import { MODULE_PATH } from '@/store/module/login'
import { saveloginUserInfo } from '@/router/index'
import  { login as loginApi }  from '@/api/login'

interface loginInfo  {
  username:String,
  password:String,
}
@Component({
  computed: {
    ...mapState(MODULE_PATH, ["isLogin"])
  },
  methods: {
    ...mapMutations(MODULE_PATH, ["changeLoginStatus"])
  }
})
export default class login extends Vue {
  isLogin:String;
  changeLoginStatus:any;
  loginInfo:loginInfo={
    username:"",
    password:"",
  };
  loginRules={
    username: [
      { validator: this.validateUsername, trigger: 'blur' }
    ],
    pass: [
      { validator: this.validatePass, trigger: 'blur' }
    ]
  };
  render(h){
    return (
      <div>
        <Form model={this.loginInfo} status-icon rules={this.loginRules} label-width="100px" >
          <FormItem label="用户名" prop="username">
            <Input value={this.loginInfo.username}  onInput={val => (this.loginInfo.username = val)} auto-complete="off"></Input>
          </FormItem>
          <FormItem label="密码" prop="pass">
            <Input type="password" value={this.loginInfo.password}  onInput={val => (this.loginInfo.password = val)} auto-complete="off"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </FormItem>
        </Form>
      </div>
    )
  };
  mounted(){
  }
  validatePass(rule, value, callback){
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      callback();
    }
  };
  validateUsername(rule, value, callback){
    if (value === '') {
      callback(new Error('请输入用户名'));
    } else {
      callback();
    }
  };
  submit(){
    //TODO请求后端接口
    loginApi(this.loginInfo).then((result)=>{
        if(result.data.first===0){
          this.$router.push("/personalInfo")
        }else if(result.data.first===1){
          //saveloginUserInfo(result.data.accessToken, result.data.permissionIds)
          saveloginUserInfo(result.data.accessToken, {
            "SG0001":1,"SG0002":2,"SG0003":3,"SG0004":4,"SG0005":5,"SG0006":6,"SG0007":7,"SG0008":8,"SG0009":9,"SG0010":10,"SG0011":11
          })
          this.changeLoginStatus(true)
          this.$router.push("/")
        }
    }).catch(function(){
      
    })
  }
}
    
