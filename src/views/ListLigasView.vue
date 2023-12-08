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
          <td v-if="!liga.editing">{{ liga.nombre }}</td>
      <td v-if="liga.editing">
        <b-form-input v-model="liga.nombre" />
      </td>

      <td v-if="!liga.editing">{{ liga.region }}</td>
      <td v-if="liga.editing">
        <b-form-input v-model="liga.region" />
      </td>
          <td><img :src="liga.imagen" alt="Imagen de Liga" class="table-img" /></td>
          <button v-if="!liga.editing" @click="habilitarEdicion(liga)"><i class="bi bi-pencil-square"></i></button>
        <button v-if="liga.editing" @click="actualizarLiga(liga)"><i class="bi bi-arrow-counterclockwise"></i></button>
          <td><button v-on:click="eliminarObjeto(liga._id)"><i class="bi bi-trash3"></i></button></td>
        </tr>
      </tbody>
    </table>
    <!-- Mensaje de Empty State si no hay ligas -->
  <div v-if="ligas.length === 0" class="empty-state">
  <p>No hay ligas disponibles.</p>
</div>
<br>
    <br>
    <button type="submit" variant="primary" @click="agregarLigas">Agregar Ligas</button>
    <div class="menu-container">
          <button @click="logout">Log-out</button>
    </div>
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

      habilitarEdicion(liga) {
      this.$set(liga, 'editing', true);
    },
    async actualizarLiga(liga) {
      const tokenAutenticacion = localStorage.getItem("jwt");
      const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
      try {
        await axios.patch(`${serverURL}ligas/${liga._id}`, {
          nombre: liga.nombre,
          region: liga.region,
          imagen: liga.imagen
        }, {
          headers: {
            'Authorization': `Bearer ${tokenAutenticacion}`
          }
        });
        liga.editing = false; // Deshabilitar modo de edición
        this.obtenerLigas(); // Actualizar la lista de ligas
      } catch (error) {
        console.error("Error al actualizar la liga:", error);
      }
    },


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
    const response = await axios.delete(`${serverURL}ligas/${idLiga}`, {
      headers: {
        'Authorization': `Bearer ${tokenAutenticacion}`
      }
    });
    if (response.status === 200) { 
      alert("Liga eliminada con éxito.");
    }
    this.obtenerLigas();
  } catch (error) {
    console.error("Error al eliminar la liga:", error);
  }
},
agregarLigas() {
      this.$router.push({ name: 'ligas' });
    },
  
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({ name: 'login'});
    }

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
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://i.pinimg.com/originals/7d/26/f0/7d26f0db1c943022656007b252600065.jpg'); 
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
  width: 80px;
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
.empty-state {
  text-align: center;
  padding: 20px;
  color: white;
}

.empty-state img {
  max-width: 100%;
  height: auto;
}

.menu-container {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  padding: 10px;
  background-color: white;
  width: 15%;
}
</style>

  
  
  