<template>
  <div id="app">
    <myheader></myheader>
    <router-view v-if="isRouterAlive">
      
    </router-view>
       
  </div>
</template>

<script>
import myheader from './components/Header'
export default {
  components:{ myheader},
  provide(){
    return {
      reload : this.reload
    }
  },
  data(){
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  padding: 0 auto;
  margin: 0 auto;
  word-wrap: break-word;
}

</style>
