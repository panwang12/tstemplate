
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
      <Row>
        <Col span={4}>
          <mainMenu/>
        </Col>
        <Col span={20}>
          <router-view/>
        </Col>
      </Row>
    </div>
    )
  }
}