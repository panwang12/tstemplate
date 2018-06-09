
import "./app.scss"
import Vue from 'vue'
import Component from 'vue-class-component'
import {Row, Col} from 'element-ui'
import mainMenu from "~/mainMenu/index"
@Component({
  components:{
    mainMenu
  }
})
export default class App extends Vue {
  render(h){
    return (
      <div id="app">
        <mainMenu/>
        <div id="container">
          <router-view/>
        </div>
    </div>
    )
  }
}