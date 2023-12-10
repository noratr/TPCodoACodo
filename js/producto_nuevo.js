console.log(location.search)     // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // producto_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        producto:{},
        id:0,
        titulo:"",
        autor:"",
        descripcion:"",
        tipo:"",
        url:'https://noratr.pythonanywhere.com/obras',
        error:false,
        cargando:true,
                
       }  
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.titulo = data.titulo;
                    //this.imagen=data.imagen
                    this.autor=data.autor
                    this.descripcion=data.descripcion
                    this.tipo=data.tipo                
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        grabar(){

            let n = geteElementById("titulo".value)
            let a = geteElementById("autor".value)
            let t = geteElementById("tipo".value)
            let d = geteElementById("descripcion".value)

            let producto = {
               // titulo:this.titulo,
                //imagen:this.imagen,
                ///autor:this.autor,
               // descripcion:this.descripcion,
                //tipo:this.tipo

                titulo:n,
                autor:a,
                tipo:t,
                descripicion:d


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

