<template>
    <b-container>
      <div class="containercolor">
        <h2>Lista de Noticias</h2>
        <br>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="noticia in noticias" :key="noticia._id">
              <td v-if="!noticia.editing">{{ noticia.nombrenot }}</td>
              <td v-if="noticia.editing">
                <b-form-input v-model="noticia.nombrenot" />
              </td>

              <td><img :src="noticia.imagennot" alt="Imagen de la Noticia" class="table-img" /></td>

              <td v-if="!noticia.editing">{{ noticia.link }}</td>
              <td v-if="noticia.editing">
                <b-form-input v-model="noticia.link" />
              </td>
              
              <button v-if="!noticia.editing" @click="habilitarEdicion(noticia)"><i class="bi bi-pencil-square"></i></button>
              <button v-if="noticia.editing" @click="actualizarNoticia(noticia)"><i class="bi bi-arrow-counterclockwise"></i></button>
              <td><button v-on:click="eliminarNoticia(noticia._id)"><i class="bi bi-trash3"></i></button></td>
            </tr>
          </tbody>
        </table>
        <div v-if="noticias.length === 0" class="empty-state">
          <p>No hay noticias disponibles.</p>
        </div>
        <br>
        <br>
        <button type="submit" variant="primary" @click="agregarNoticias">Agregar Noticias</button>
        <div class="menu-container">
          <button @click="logout">Cerrar Sesión</button>
        </div>
      </div>
    </b-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NoticiasView',
    data() {
      return {
        nombrenoticia: "",
        linknoticia: "",
        imagennoticia:"",
        noticias: []
      }
    },
    created() {
      this.obtenerNoticias();
    },
    methods: {
      habilitarEdicion(noticia) {
        this.$set(noticia, 'editing', true);
      },
      async actualizarNoticia(noticia) {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
        try {
          await axios.put(`${serverURL}noticias/${noticia._id}`, {
            nombrenot: noticia.nombrenot,
            link: noticia.link,
            imagennot: noticia.imagennot
          }, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          noticia.editing = false; // Deshabilitar modo de edición
          this.obtenerNoticias(); // Actualizar la lista de noticias
        } catch (error) {
          console.error("Error al actualizar la noticia:", error);
        }
      },
      async obtenerNoticias() {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        try {
          const response = await axios.get(`${serverURL}noticias/`, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          this.noticias = response.data;
        } catch (error) {
          console.error("Error al obtener las noticias:", error);
        }
      },
      async eliminarNoticia(idNoticia) {
        const tokenAutenticacion = localStorage.getItem("jwt");
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        try {
          await axios.delete(`${serverURL}noticias/${idNoticia}`, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          this.obtenerNoticias();
        } catch (error) {
          console.error("Error al eliminar la noticia:", error);
        }
      },
      agregarNoticias() {
        this.$router.push({ name: 'noticias' });
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
  width: 180px;
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

  