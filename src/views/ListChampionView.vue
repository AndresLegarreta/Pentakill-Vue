<template>
    <b-container>
      <div class="containercolor"> 
        <h2>Lista de Campeones</h2>
        <br>
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Alias</th>
              <th>Descripción</th>      
            </tr>
          </thead>
          <tbody>
            <tr v-for="campeon in campeones" :key="campeon._id">
              <td><img :src="campeon.image" alt="Imagen del Campeón" class="table-img" /></td>

              <td v-if="!campeon.editing">{{ campeon.name }}</td>
              <td v-if="campeon.editing">
                <b-form-input v-model="campeon.name" />
              </td>
              <td v-if="!campeon.editing">{{ campeon.description }}</td>
              <td v-if="campeon.editing">
                <b-form-input v-model="campeon.description" />
              </td>
              <td v-if="!campeon.editing">{{ campeon.blurb }}</td>
              <td v-if="campeon.editing">
                <b-form-input v-model="campeon.blurb" />
              </td>
              <button v-if="!campeon.editing" @click="habilitarEdicion(campeon)"><i class="bi bi-pencil-square"></i></button>
              <button v-if="campeon.editing" @click="actualizarCampeon(campeon)"><i class="bi bi-arrow-counterclockwise"></i></button>
              <td><button v-on:click="eliminarObjeto(campeon._id)"><i class="bi bi-trash3"></i></button></td>
            </tr>
          </tbody>
        </table>
        <!-- Mensaje de Empty State si no hay campeones -->
        <div v-if="campeones.length === 0" class="empty-state">
          <p>No hay campeones disponibles.</p>
        </div>
        <br>
        <br>
        <button type="submit" variant="primary" @click="agregarCampeones">Agregar Campeones</button>
        <div class="menu-container">
          <button @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </b-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ChampionView',
    data() {
      return {
        campeones: []
      }
    },
    created() {
      this.obtenerCampeones();
    },
    methods: {
      habilitarEdicion(campeon) {
        this.$set(campeon, 'editing', true);
      },
      async actualizarCampeon(campeon) {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
        try {
          await axios.put(`${serverURL}champ/${campeon._id}`, {
            name: campeon.name,
            blurb: campeon.blurb,
            image: campeon.image,
            description: campeon.description
          }, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          campeon.editing = false; // Deshabilitar modo de edición
          this.obtenerCampeones(); // Actualizar la lista de campeones
        } catch (error) {
          console.error("Error al actualizar el campeón:", error);
        }
      },
      async obtenerCampeones() {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        const response = await axios.get(`${serverURL}champ/`, {
          headers: {
            'Authorization': `Bearer ${tokenAutenticacion}`
          }
        });
        if (response && response.data) {
          this.campeones = response.data;
        }
      },
      async eliminarObjeto(idCampeon) {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        try {
          await axios.delete(`${serverURL}champ/${idCampeon}`, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          this.obtenerCampeones();
        } catch (error) {
          console.error("Error al eliminar el campeón:", error);
        }
      },
      agregarCampeones() {
        this.$router.push({ name: 'champion' });
      },
      logout() {
        localStorage.removeItem('jwt');
        this.$router.push({ name: 'login' });
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
  width: 50px;
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
  