<template>
  <b-container>
  <div class="containercolor"> 
    <h2>Lista de Ligas</h2>
    <br>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Región</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="liga in ligas" :key="liga._id">
          <td>{{ liga.nombre }}</td>
          <td>{{ liga.region }}</td>
          <td><img :src="liga.imagen" alt="Imagen de Liga" class="table-img" /></td>
          <td><button v-on:click="eliminarObjeto(liga._id)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
    <br>
    <b-button type="submit" variant="primary" @click="agregarLigas">Agregar Ligas</b-button>
  </div>
</b-container>
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
        imagenliga:"",
        ligas:[]
      }
    },

  created() {
    this.obtenerLigas();
  },
    methods:{
      async obtenerLigas(){
        const tokenAutenticacion = localStorage.getItem("jwt");
        const requestBody = {
          nombre: this.nombreliga,
          region: this.regionliga,
          imagen: this.imagenliga
        }
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        const response = await axios.get(`${serverURL}ligas/`, 
        requestBody,
         {
          headers: {
            'Authorization': `Barer ${tokenAutenticacion}`
          }
        }
      );
      if (response && response.data){
        this.ligas = response.data;
      }
    },
    

async eliminarObjeto(idLiga) {
  const tokenAutenticacion = localStorage.getItem("jwt");
  const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";

  try {
    await axios.delete(`${serverURL}ligas/${idLiga}`, {
      headers: {
        'Authorization': `Bearer ${tokenAutenticacion}`
      }
    });
    this.obtenerLigas();
  } catch (error) {
    console.error("Error al eliminar la liga:", error);
  }
}
},
agregarLigas() {
      this.$router.push({ name: 'ligas' });
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
  background-repeat: no-repeat; /* Centra los hijos horizontalmente */
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

.b-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0;
}

table {
  background-color: white; /* Fondo blanco para la tabla */
  width: 1200px;
  margin: auto; /* Asegura que la tabla esté centrada horizontalmente */
  border-collapse: collapse;
  /* ... otros estilos ... */
}

h2 {
  margin-top: 0; /* Puedes ajustar esto para cambiar el espacio sobre el título */
  margin-bottom: 1rem;
  color: white; /* Color de texto para el botón */


}
</style>

  
  
  