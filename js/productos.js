const { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        producto:{},
        id:0,
        titulo:"",
        autor:"",
        tipo:"",
        descripcion:"",
        imagen:"",
        
 
        url:'http://noratr.pythonanywhere.com/obras',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,

    }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let producto = {
                titulo:this.titulo,
                autor: this.autor,
                tipo:this.tipo,
                descripcion: this.descripcion,
                imagen:this.imagen,
            }
            console.log(producto)
            var options = {
                body:JSON.stringify(producto),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./productos.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
            