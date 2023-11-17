<template>
    <div id="app">
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
            <br>
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
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>