// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Element from 'element-ui';


Vue.prototype.axios = axios
Vue.prototype.HOST = "/api"

Vue.config.productionTip = false

Vue.use(ElementUI);



/* eslint-disable no-new */

new Vue({
    el: '#app',
    router,
    axios,
    components: { App },
    template: '<App/>',
    render: h => h(App)
})