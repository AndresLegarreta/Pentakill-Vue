<template>
  <div>
    
    <b-sidebar visible id="sidebar-1" title="Sidebar" shadow>
      Ventana de Catalogo
      <br>
      <router-link to="dashboard/ligas">Ligas</router-link> 
    </b-sidebar>
    <router-view></router-view>

  </div>
</template>

<script>

import axios from 'axios';


export default {
  name: 'App',
  components: {
    
  },

  data(){
    return{
      username:"",
      password:""
    }
  },
  methods:{
    async login(event){
      event.preventDefault();
      const requestBody = {
        us: this.username,
        pass: this.password
      }
    await axios.post('https://tasty-pig-flip-flops.cyclic.app/users/login', requestBody);
    }
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
