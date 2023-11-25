<template>
  <div class="containercolor"> 
      <h2>Lista de Partidos</h2>
      <br>
      <table>
        <thead>
          <tr>
            <th>Nombre de la Liga</th>
            <th>Equipo 1</th>
            <th>Resumen Equipo 1</th>
            <th>Equipo 2</th>
            <th>Resumen Equipo 2</th>
            <th>Fecha del Partido</th>
            <th>Resultado</th>
            <th>Número del Partido</th>
            <th>Fase del Partido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partido in partidos" :key="partido._id">
            <td>{{ partido.nombreleague }}</td>
            <td>{{ partido.equipo1 }}</td>
            <td>{{ partido.equipo1res }}</td>
            <td>{{ partido.equipo2 }}</td>
            <td>{{ partido.equipo2res }}</td>
            <td>{{ partido.fecha }}</td>
            <td>{{ partido.equipogp }}</td>
            <td>{{ partido.gamenm }}</td>
            <td>{{ partido.nombrepartido }}</td>
            <td>
              <button v-on:click="eliminarObjeto(partido._id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <b-button type="submit" variant="primary" @click="agregarPartido">Agregar Partidos</b-button>
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
      nombredeligapl:"",
      equiponum1pl:"",
      equiponum1resumenpl:"",
      equiponum2pl:"",
      equiponum2resumenpl:"",
      fechapartidopl:"",
      resultadopl:"",
      numeropartidopl:"",
      nombrepartidopl:"",
      partidos: []
    }
  },
  
    created() {
      this.obtenerPartidos();
    },
      methods:{
        async obtenerPartidos(){
          const tokenAutenticacion = localStorage.getItem("jwt");
          const requestBody = {
            nombreleague: this.nombredeligapl,
            equipo1: this.equiponum1pl,
            equipo1res: this.equiponum1resumenpl,
            equipo2: this.equiponum2pl,
            equipo2res: this.equiponum2resumenpl,
            fecha: this.fechapartidopl,
            equipogp: this.resultadopl,
            gamernm: this.numeropartidopl,
            nombrepartido: this.nombrepartidopl,
          }
          const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
    
          const response = await axios.get(`${serverURL}partidos/`, 
          requestBody,
           {
            headers: {
              'Authorization': `Barer ${tokenAutenticacion}`
            }
          }
        );
        if (response && response.data){
          this.partidos = response.data;
        }
      },
      
  
  async eliminarObjeto(idPartido) {
    const tokenAutenticacion = localStorage.getItem("jwt");
    const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
    try {
      await axios.delete(`${serverURL}partidos/${idPartido}`, {
        headers: {
          'Authorization': `Bearer ${tokenAutenticacion}`
        }
      });
      this.obtenerLigas();
    } catch (error) {
      console.error("Error al eliminar el partido:", error);
    }
  }
  
    },
    agregarPartido() {
      this.$router.push({ path: '/partidospath' });
    }
  }
    
    </script>
    
    
    
  <style>
.containercolor {
  background-color: transparent; /* Hace que el contenedor sea transparente */
  padding: 20px;
  border-radius: 10px;
  text-align: center; /* Centra el texto del título */
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  
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
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('C:\Users\andes\OneDrive\Documentos\ULSA\Programacion para Internet\vue-pentakill\src\assets\t1.jpg'); /* Ruta relativa a la imagen */
    background-size: cover; /* Asegúrate de que la imagen cubra todo el contenedor */
    background-position: center; /* Centra la imagen en el contenedor */
    background-repeat: no-repeat; /* Centra los hijos horizontalmente */ /* Centra los hijos horizontalmente */
  }
  
  table {
    background-color: white; /* Fondo blanco para la tabla */
  border-radius: 10px; /* Bordes redondeados para la tabla */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  img {
    width: 100px;
    height: auto;
  }
  h2 {
  margin-bottom: 20px;
  color: white; /* Color de texto para el botón */


}
  </style>
  