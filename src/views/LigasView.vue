<template>
  <div class="center-container">
    <b-container>
      <b-row>
        <b-col></b-col>
        <b-col cols="6">
          <b-card title="Ligas">
            <b-form @submit.prevent="nuevaLiga">
              <b-form-group label="Nombre de la Liga">
                <b-form-input
                  v-model="nombreliga"
                  placeholder="Enter the name"
                  required
                ></b-form-input>
              </b-form-group>
              <br>
              <b-form-group label="Región">
                <b-form-input
                  v-model="regionliga"
                  placeholder="Enter the region"
                  required
                ></b-form-input>
              </b-form-group>
              <br>
              <b-form-group label="Imagen">
                <b-form-input
                  v-model="imagenliga"
                  placeholder="Upload an image"
                  required
                ></b-form-input>
              </b-form-group>
              <br>
              <b-button type="submit" variant="primary">Save</b-button>
            </b-form>
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
  name: 'LigasView',
  components: {
    
  },

  data(){
    return{
      nombreliga:"",
      regionliga:"",
      imagenliga:""
    }
  },
  methods:{
    async nuevaLiga(event){
      event.preventDefault();
      const tokenAutenticacion = localStorage.getItem("jwt");
      const requestBody = {
        nombre: this.nombreliga,
        region: this.regionliga,
        imagen: this.imagenliga
      }
      const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";

      const response = await axios.post(`${serverURL}ligas/crear`, 
      requestBody,
       {
        headers: {
          'Authorization': `Barer ${tokenAutenticacion}`
        }
      }
    ); 
    console.log(response); 
    
}
}
}
</script>


<style>
.center-container {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Altura completa de la ventana */
}

@font-face {
  font-family: 'Beaufort';
  src: url('C:\Users\andes\OneDrive\Documentos\ULSA\Programacion para Internet\vue-pentakill\src\assets\BeaufortForLoL-OTF\BeaufortForLoL-OTF\BeaufortforLOL-Bold.otf') format('opentype');
  font-weight: bold;
  font-style: normal;
}

#app {
  font-family: 'Beaufort', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url('C:\Users\andes\OneDrive\Documentos\ULSA\Programacion para Internet\vue-pentakill\src\assets\t1.jpg'); /* Ruta relativa a la imagen */
  background-size: cover; /* Asegúrate de que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat; /* Centra los hijos horizontalmente */
}
</style>




