import Vue from 'vue'
import App from './App.vue'
import router from './router'


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)//创建虚拟dom元素,在app.vue的根文件中创建的
  //.vue是组件文件,组件文件有三个部分构成
}).$mount('#app')

new Vue({
  //如果属性名和属性是一致的，冒号后面的东西可以省略
  router
  // router: h => h(testPage)
}).$mount("#testPage")//这里是挂在的页面名称