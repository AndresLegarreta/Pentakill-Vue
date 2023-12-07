<template>
      <b-container>
        <b-row>
          <b-col></b-col>
          <b-col cols="6">
            <b-card title="Register">
            <b-form @submit="register"> 
                <br>
              <b-form-group label="Username">
                <b-form-input v-model="username" placeholder="Enter your username" required></b-form-input>
              </b-form-group>
              <br>
              <b-form-group label="Password">
                <b-form-input v-model="pass" type="password" placeholder="Enter your password" required></b-form-input>
              </b-form-group>
              <br>
              <b-button type="submit" variant="primary">Register</b-button>
            </b-form>
            <router-link to="/">Login</router-link>
            <br>
          </b-card>
          </b-col>
          <b-col></b-col>
        </b-row>
      </b-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name:'App',
    components: {
  
    },
    data(){
      return{
        username: "",
        pass: "",
       
      }
    },
    methods:{
      async register(event){
        event.preventDefault();
        const requestBody = {
          us: this.username,
          pass: this.pass,
          
        }
  
        const serveUrl = "https://tasty-pig-flip-flops.cyclic.app/";
  
        const response = await axios.post(
          `${serveUrl}users/registrar`,
          requestBody
        );
        console.log(response)
      }
    }
  }
  </script>
  
  <style>
.b-container {
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
  text-align: center;
  color: #2c3e50;
  background-image: url('https://cdn.beahero.gg/2021/02/Youtube-Version-1080p.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
}
  </style>