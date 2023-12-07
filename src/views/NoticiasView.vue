<template>
    <div class="noticias-view">
      <h2>Agregar Nueva Noticia</h2>
      <br>
  
      <b-form @submit.prevent="nuevaNoticia">
        <br>
        <b-form-group label="Nombre de la Noticia">
          <b-form-input
            v-model="nombrenoticia"
            placeholder="Enter the name"
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group label="Imagen">
          <b-form-input
            v-model="imagennoticia"
            placeholder="Enter the url"
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <b-form-group label="Link">
          <b-form-input
            v-model="linknoticia"
            placeholder="Enter the link"
            required
          ></b-form-input>
        </b-form-group>
        <br>
        <button type="submit" variant="primary">Guardar</button>
        <button type="submit" variant="primary" @click="backbutton">Atrás</button>
      </b-form>
      <div class="menu-container">
        <button @click="logout">Cerrar Sesión</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'NoticiasView',
    data() {
      return {
        nombrenoticia: "",
        linknoticia: "",
        imagennoticia: ""
      }
    },
    methods: {
      async nuevaNoticia(event) {
        event.preventDefault();
        const tokenAutenticacion = localStorage.getItem("jwt");
        const requestBody = {
          nombrenot: this.nombrenoticia,
          link: this.linknoticia,
          imagennot: this.imagennoticia
        }
        const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
        try {
          const response = await axios.post(`${serverURL}noticias/crear`, requestBody, {
            headers: {
              'Authorization': `Bearer ${tokenAutenticacion}`
            }
          });
          console.log(response);
        } catch (error) {
          console.error("Error al agregar la noticia:", error);
        }
      },
      backbutton() {
        this.$router.push({ name: 'listanoticias' });
      },
      logout() {
        localStorage.removeItem('jwt');
        this.$router.push({ name: 'login' });
      }
    }
  }
  </script>
  
  <style>
  #app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-image: url('https://i.pinimg.com/originals/7d/26/f0/7d26f0db1c943022656007b252600065.jpg'); 
  background-size: cover; /* Asegúrate de que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen en el contenedor */
  background-repeat: no-repeat; /* Centra los hijos horizontalmente */
  
}

.noticias-view {
  font-family: 'Times New Roman', Times, serif;
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

.noticias-view label {
  display: block; /* Asegura que el label sea un bloque para aplicar el margen */
  margin-bottom: 0.5rem; /* Espacio entre el label y su input correspondiente */
  text-align: center; /* Alinea el texto a la izquierda */
  
}

.noticias-view input {
  width: 150%; /* Los inputs y botones toman todo el ancho disponible */
  padding: 8px;
  border: 3px solid #ccc; /* Estilo de borde para los input */
  border-radius: 15px;
  text-align: center; /* Alinea el texto a la izquierda */
  margin-left: -45px;


}

.noticias-view button {
  background-color: #2c3e50; /* Color de fondo para el botón */
  color: white; /* Color de texto para el botón */
  border-radius: 15px; /* Elimina el borde del botón */
  cursor: pointer; /* Cambia el cursor a un puntero */
  margin-top: 10px; /* Espacio adicional arriba del botón */
  width: 80%;
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

.noticias-view h2 {
  text-align: center; /* Centra el texto del título */
  width: 100%; /* Opcional: hace que el título ocupe todo el ancho disponible */
  margin-bottom: 1rem; /* Espacio debajo del título */
  color: #2c3e50
}

  </style>
  