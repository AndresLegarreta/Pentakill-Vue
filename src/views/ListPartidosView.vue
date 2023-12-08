<template>
  <div class="containercolor"> 
      <h2>Lista de Partidos</h2>
      <br>
      <table>
        <thead>
          <tr>
            <th>Nombre de la Liga</th>
            <th>Nombre del Partido</th>
            <th>Equipo 1</th>  
            <th>Img eq1</th> 
            <th>Equipo 2</th>
            <th>Img eq2</th>
            <th>Fecha del Partido</th>
            <th>Resultado</th>
            <th>Fase del Partido</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partido in partidos" :key="partido._id">
            <td v-if="!partido.editing">{{ partido.nombreleague ? partido.nombreleague.nombre : "" }}</td>
            <td v-if="partido.editing">
    <b-form-select v-model="partido.nombreleague" :options="opcionesLigas" required placeholder="Seleccione una liga"></b-form-select>
</td>

            

          <td v-if="!partido.editing">{{ partido.nombrepartido }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.nombrepartido" />
          </td>

          <td v-if="!partido.editing">{{ partido.equipo1 }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.equipo1" />
          </td>

          <td><img :src="partido.equipo1imagen" alt="Imagen del equipo 1" class="table-img" /></td>

          <td v-if="!partido.editing">{{ partido.equipo2 }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.equipo2" />
          </td>

          <td><img :src="partido.equipo2imagen" alt="Imagen del equipo 2" class="table-img" /></td>

          <td v-if="!partido.editing">{{ partido.fecha }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.fecha" />
          </td>

          <td v-if="!partido.editing">{{ partido.equipogp }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.equipogp" />
          </td>

          <td v-if="!partido.editing">{{ partido.gamenm }}</td>
          <td v-if="partido.editing">
            <b-form-input v-model="partido.gamenm" />
          </td>
          


              <button v-if="!partido.editing" @click="habilitarEdicionPartido(partido)"><i class="bi bi-pencil-square"></i></button>
              <button v-if="partido.editing" @click="actualizarPartido(partido)"><i class="bi bi-arrow-counterclockwise"></i></button>
              <td><button v-on:click="eliminarObjeto(partido._id)"><i class="bi bi-trash3"></i></button></td> 
          </tr>
        </tbody>
      </table>
      
  <div v-if="partidos.length === 0" class="empty-state">
  <p>No hay partidos disponibles.</p>
</div>
<br>
      <br>
      <button type="submit" variant="primary" @click="agregarPartido">Agregar Partidos</button>
      <div class="menu-container">
          <button @click="logout">Log-out</button>
    </div>
    <div class="filter-container">
    <b-form-select v-model="ligaSeleccionada" @change="filtrarPorLiga" :options="opcionesLigas"></b-form-select>
  </div>
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
      equipoimagen1:"",
      equiponum2pl:"",
      equipoimagen2:"",
      fechapartidopl:"",
      resultadopl:"",
      numeropartidopl:"",
      nombrepartidopl:"",
      partidos: [],
      ligaSeleccionada: null,
      ligas: [],
      opcionesLigas: [],
    }
  },
  
      methods:{

      habilitarEdicionPartido(partido) {
      this.$set(partido, 'editing', true);
},
    async actualizarPartido(partido) {
  const tokenAutenticacion = localStorage.getItem("jwt");
  const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
    await axios.patch(`${serverURL}partidos/${partido._id}`, {
      nombreleague: partido.nombreleague,
      equipo1: partido.equipo1,
      equipo1imagen: partido.equipo1imagen,
      equipo2: partido.equipo2,
      equipo2imagen: partido.equipo2imagen,
      fecha: partido.fecha,
      equipogp: partido.equipogp,
      gamenm: partido.gamenm,
      nombrepartido: partido.nombrepartido
    }, {
      headers: {
        'Authorization': `Bearer ${tokenAutenticacion}`
      }
    });
    partido.editing = false;
    this.obtenerPartidos();
},


        async obtenerPartidos(){
          const tokenAutenticacion = localStorage.getItem("jwt");
          const requestBody = {
            nombreleague: this.nombredeligapl,
            equipo1: this.equiponum1pl,
            equipo1imagen: this.equipoimagen1,
            equipo2: this.equiponum2pl,
            equipo2imagen: this.equipoimagen2,
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
        if (response && response.data) {
    this.partidos = response.data.map(partido => ({ ...partido, editing: false }));
  }
},
      
  
  async eliminarObjeto(idPartido) {
    const tokenAutenticacion = localStorage.getItem("jwt");
    const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";
  
    try {
      const response = await axios.delete(`${serverURL}partidos/${idPartido}`, {
        headers: {
          'Authorization': `Bearer ${tokenAutenticacion}`
        }
      });
      if (response.status === 200) { 
      console.log("Partido eliminado con éxito.");
    }
      this.obtenerPartidos();
    } catch (error) {
      console.error("Error al eliminar el partido:", error);
    }
  },
  agregarPartido() {
      this.$router.push({ name: 'partidos' });
    },
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push({ name: 'login'});
    },
    async cargarLigas() {
      const tokenAutenticacion = localStorage.getItem("jwt");
      const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";

      try {
        const response = await axios.get(`${serverURL}ligas/`, {
          headers: {
            'Authorization': `Bearer ${tokenAutenticacion}`
          }
        });

        // Guardar las ligas en la data del componente
        this.ligas = response.data;

        // Preparar las opciones para el dropdown
        this.opcionesLigas = this.ligas.map(liga => ({
          value: liga._id,
          text: liga.nombre
        }));

        // Agregar una opción para 'Todas las ligas' al inicio de las opciones
        this.opcionesLigas.unshift({ value: null, text: 'Todas las Ligas' });
      } catch (error) {
        console.error('Error al cargar las ligas:', error);
        // Manejar el error como creas conveniente
      }
    },

    // Método para filtrar los partidos por la liga seleccionada
    async obtenerPartidosPorLiga(ligaId) {
    const tokenAutenticacion = localStorage.getItem("jwt");
    const serverURL = "https://tasty-pig-flip-flops.cyclic.app/";

    try {
      // Agrega el ID de la liga como un parámetro de consulta en la solicitud GET
      const response = await axios.get(`${serverURL}partidos/porLiga`, {
        headers: {
          'Authorization': `Bearer ${tokenAutenticacion}`
        },
        params: {
          ligaId: ligaId // Asegúrate de que este nombre concuerde con el esperado en el backend
        }
      });
      this.partidos = response.data;
    } catch (error) {
      console.error('Error al obtener los partidos por liga:', error);
      // Manejar el error como creas conveniente
    }
    },

    // Método invocado cuando se selecciona una liga del dropdown
    filtrarPorLiga() {
      if (this.ligaSeleccionada) {
        this.obtenerPartidosPorLiga(this.ligaSeleccionada);
      } else {
        // Si no hay liga seleccionada o se selecciona 'Todas las Ligas', obtener todos los partidos
        this.obtenerPartidos();
      }
  },
  
 },
 created() {
    this.cargarLigas();
    this.obtenerPartidos();
  },

 computed: {
  OpcionesLigas() {
    return this.ligas.map(liga => ({
      value: liga._id, 
      text: liga.nombre
    }));
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
    color: white;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url('https://i.pinimg.com/originals/7d/26/f0/7d26f0db1c943022656007b252600065.jpg'); 
    background-size: cover; /* Asegúrate de que la imagen cubra todo el contenedor */
    background-position: center; /* Centra la imagen en el contenedor */
    background-repeat: no-repeat; /* Centra los hijos horizontalmente */ /* Centra los hijos horizontalmente */
  }
  
  table {
    background-color: gray; /* Fondo blanco para la tabla */
  border-radius: 10px; /* Bordes redondeados para la tabla */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    border: 1px solid white;
    padding: 8px;
    text-align: center;
    vertical-align: middle;
    border-radius: 10px;
  }
  
  th {
    color: black;
    background-color: #f2f2f2;
  }
  
  img {
    width: 50px;
    height: auto;
  }
  h2 {
  margin-bottom: 20px;
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
.filter-container {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 30px;
  background-color: white;
  width: 15%;
}
  </style>
  