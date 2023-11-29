<template>
  <div>
    
    <b-sidebar visible id="sidebar-1" title="Sidebar" shadow>
      Ventana de Catalogo
      <br>
      <div class="d-flex flex-column">
      <router-link :to="{name: 'listaligas'}">Ligas</router-link> 
      <router-link :to="{name: 'listapartidos'}">Partidos</router-link> 
    </div> 
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
      password:"",
      isSidebarVisible: false
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
/*@font-face {
  font-family: 'Beaufort';
  src: url('C:\Users\andes\OneDrive\Documentos\ULSA\Programacion para Internet\vue-pentakill\src\assets\BeaufortForLoL-OTF\BeaufortForLoL-OTF\BeaufortforLOL-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}*/

#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
