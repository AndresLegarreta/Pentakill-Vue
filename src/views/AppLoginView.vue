<template>
  <div class ="center-container">
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols ="10">
          <b-card title="Login">
            <br>
    <b-form @submit="login">
      <b-form-group
          label="Username"
      >
        <b-form-input
            v-model="username"
            placeholder="Enter your username"
            required
        ></b-form-input>
      </b-form-group>
      <br>
      <b-form-group
          label="Password"
      >
        <b-form-input
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
        ></b-form-input>
      </b-form-group>
      <br>
      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
    <router-link to="register">Registro</router-link>
  </b-card>
        </b-col>
        <b-col></b-col>
      </b-row>
    </b-container>

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
      
      const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";

    try{
     const response = await axios.post(`${serverURL}users/login`, requestBody);

    console.log(response);
    if (response && response.data && response.data.token){
      localStorage.setItem("jwt", response.data.token)

      this.$router.push({path: "/dashboard"})      
      
    }else{
      alert("Error en el Login")
      }
        }catch (err){
        alert("Error en el Login")
      }
    } 
  },
}
</script>


<style>
.center-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Altura completa de la ventana */
}
body, html {
  height: 100%;
  margin: 0;
  padding: 0;
}

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
  background-image: url('https://cdn.beahero.gg/2021/02/Youtube-Version-1080p.jpg'); 
  margin: 0; /* Elimina el margen predeterminado */
  padding: 0; /* Elimina el relleno predeterminado */
  background-size: cover; /* La imagen cubre completamente el área visible */
  background-position: center; /* Centra la imagen en la página */
  background-repeat: no-repeat; /* Evita la repetición de la imagen */
  height: 100vh; /* Asegúrate de que el body ocupe al menos la altura de la ventana */
  width: 100vw; /* Centra los hijos horizontalmente */
}
</style>
