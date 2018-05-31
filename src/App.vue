<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="tsx">

import "./app.scss"

import Vue from 'vue'
export default Vue.extend( {
  name: 'App',
  data(){
    return {
    }
  },
  methods:{
    
  }
})
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
