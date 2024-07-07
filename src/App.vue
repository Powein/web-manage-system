<template>
  <div>
    <test-view></test-view>
  </div>
</template>
<script>
// import ManageView from './views/elements/ManageView.vue'

// import DialogFormView from './views/elements/DialogFormView.vue'
// import DialogView from './views/elements/DialogView.vue'
// import ElementView from './views/elements/ElementView.vue'
// import PageView from './views/elements/PageView.vue'
// 控制模板的数据来源和行为
import TestView from './views/elements/TestView.vue'
export default {
  components : { TestView },
  // components: { ManageView },
  // components: {ElementView, PageView, DialogView, DialogFormView },
  data() {
    return {
      message: "哇袄" 
    }
  },
}
</script>

<style>
/* 控制css样式代码 */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #2cd78a;
}
</style>
