import Vue from 'vue';
import {} from 'vuex';
import Component from "vue-class-component";
import {} from "element-ui";
import Sidebar from "./Sidebar";

@Component({})

export default class equipmentManage extends Vue {

  render(h){
      return (
        <Sidebar
        ref="sidebar"
      />
      )
  }

  mounted(){

  }
}
    
