console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        id:0,
        titulo:"",
        autor:"",
        descripcion:"",
        tipo:"",
        imagen:"",
        url:'https://noratr.pythonanywhere.com/obras/'+id,
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.id=data.id
                    this.titulo = data.titulo;
                    this.imagen=data.imagen
                    this.autor=data.autor
                    this.descripcion=data.descripcion
                    this.tipo=data.tipo                
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        modificar() {
            let producto = {
                titulo:this.titulo,
                imagen:this.imagen,
                autor:this.autor,
                descripcion:this.descripcion,
                tipo:this.tipo
                
            }
            var options = {
                body: JSON.stringify(producto),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "productos.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
