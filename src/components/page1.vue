<template>
    <div id="d1">
      {{msg}}
      <p>{{systemName}}</p>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { getSystemName } from '../ajax/axios'
    export default Vue.extend({
      mounted(){
        getSystemName('wangpan').then((req)=>{
          console.log(req.data)
          this.$store.commit("changeSystemName",req.data)
        })
      },
      data(){
        return {
          msg:"这是我的test分支",
        };
      },
      computed:{
        systemName():string{
            return this.$store.state.a.name
        }
      }
    })
</script>

<style scoped>

</style>
