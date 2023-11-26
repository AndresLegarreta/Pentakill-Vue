<template>
  <div class="partidos-view">
    <h2>Agregar Nuevo Partido</h2>
    <br>
    <b-form @submit.prevent="nuevoPartido">
      <b-form-group label="Nombre de Liga:" label-for="nombreliga">
        <b-form-input id="nombreliga" v-model="nombredeliga" required></b-form-input>
      </b-form-group>

      <b-form-group label="Fase del Partido:" label-for="nombrepartido">
        <b-form-input id="nombrepartido" v-model="nombrepartido" required></b-form-input>
      </b-form-group>

      <b-form-group label="Equipo 1:" label-for="equipo1">
        <b-form-input id="equipo1" v-model="equiponum1" required></b-form-input>
      </b-form-group>

      <b-form-group label="Resumen Equipo 1:" label-for="equipo1resumen">
        <b-form-input id="equipo1resumen" v-model="equiponum1resumen" required></b-form-input>
      </b-form-group>

      <b-form-group label="Equipo 2:" label-for="equipo2">
        <b-form-input id="equipo2" v-model="equiponum2" required></b-form-input>
      </b-form-group>

      <b-form-group label="Resumen Equipo 2:" label-for="equipo2resumen">
        <b-form-input id="equipo2resumen" v-model="equiponum2resumen" required></b-form-input>
      </b-form-group>

      <b-form-group label="Fecha del Partido:" label-for="fechapartido">
        <b-form-input type="date" id="fechapartido" v-model="fechapartido" required></b-form-input>
      </b-form-group>

      <b-form-group label="Resultado:" label-for="resultado">
        <b-form-input id="resultado" v-model="resultado" required></b-form-input>
      </b-form-group>

      <b-form-group label="Número del Partido:" label-for="numeropartido">
        <b-form-input type="number" id="numeropartido" v-model="numeropartido" required></b-form-input>
      </b-form-group>
      <br>
      <button type="submit" variant="primary">Crear Partido</button>
      <button type="submit" variant="primary" @click="backbutton">Back</button>
    </b-form>
  </div>
</template>


<script>

import axios from 'axios';


export default {
  name: 'PartidosView',
  components: {
    
  },

  data(){
    return{
      nombredeliga:"",
      nombrepartido:"",
      equiponum1:"",
      equiponum1resumen:"",
      equiponum2:"",
      equiponum2resumen:"",
      fechapartido:"",
      resultado:"",
      numeropartido:"",
    }
  },
  methods:{
    async nuevoPartido(event){
      event.preventDefault();
      const tokenAutenticacion = localStorage.getItem("jwt");
      const requestBody = {
        nombreleague: this.nombredeliga,
        nombrepartido: this.nombrepartido,
        equipo1: this.equiponum1,
        equipo1res: this.equiponum1resumen,
        equipo2: this.equiponum2,
        equipo2res: this.equiponum2resumen,
        fecha: this.fechapartido,
        equipogp: this.resultado,
        gamenm: this.numeropartido
        
      }
      const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
    
      const response = await axios.post(`${serverURL}partidos/crear`, 
      requestBody,
       {
        headers: {
          'Authorization': `Barer ${tokenAutenticacion}`
        }
      }
    ); 
    // Aquí es donde manejas la respuesta del servidor:
    console.log(response); // Este es el mensaje de confirmación
    

    },
    backbutton(){
      this.$router.push({ name: 'listapartidos' });

    }
}
}



</script>


<style>
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

.partidos-view {
  font-family: 'Beaufort', sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  border: 2px solid #2c3e50;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-size: cover; /* Asegúrate de que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat; /* Centra los hijos horizontalmente */
}

.form-group {
  width: 100%;
  max-width: 200px; /* O ajusta según el ancho deseado para tus campos */
  margin-bottom: 15px; /* Espacio entre grupos de formulario */
}

.partidos-view label {
  display: block; /* Asegura que el label sea un bloque para aplicar el margen */
  margin-bottom: 0.5rem; /* Espacio entre el label y su input correspondiente */
  text-align: center; /* Alinea el texto a la izquierda */
  
}

.partidos-view input {
  width: 150%; /* Los inputs y botones toman todo el ancho disponible */
  padding: 8px;
  border: 3px solid #ccc; /* Estilo de borde para los input */
  border-radius: 15px;
  text-align: center; /* Alinea el texto a la izquierda */
  margin-left: -45px;


}

.partidos-view button {
  background-color: #2c3e50; /* Color de fondo para el botón */
  color: white; /* Color de texto para el botón */
  border-radius: 15px; /* Elimina el borde del botón */
  cursor: pointer; /* Cambia el cursor a un puntero */
  margin-top: 10px; /* Espacio adicional arriba del botón */
  width: 80%;
}
.partidos-view h2 {
  text-align: center; /* Centra el texto del título */
  width: 100%; /* Opcional: hace que el título ocupe todo el ancho disponible */
  margin-bottom: 1rem; /* Espacio debajo del título */
  color: #2c3e50
}


</style>


