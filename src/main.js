// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { Button, Input, Upload, Dialog, Message, Dropdown, DropdownMenu, DropdownItem } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Input)
Vue.use(Upload)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dialog)
Vue.use(Message)

Vue.prototype.$message = Message

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
