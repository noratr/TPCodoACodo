const { createApp } = Vue
createApp({
    data() {
        return {
            url: './js/datos.json',
            error: false,
            datosFinales:[],
            datos: [],
            tipos : [],
            tipo:""
        }
    },
    methods: {
        fetchdata(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log()

                    this.datos = data.resultados
                    this.datosFinales = data.resultados
                    //------------------------
                    
                    for (elemento of this.datos) {
                        if (this.tipos.indexOf(elemento.tipo) < 0)  //encuentra
                            this.tipos.push(elemento.tipo)
                    }
                    console.log(this.tipos)

                }
                );
        },
        filtarDatos(){
            tipo=document.querySelector("select").value
            this.datosFinales=this.datos.filter(x => x.tipo===tipo)
           
           
           
        },
        ordenarDatos(){
            if (document.querySelector("#ordenNombre").checked )
                this.datosFinales.sort((a,b)=>a.nombre.toUpperCase() >  b.nombre.toUpperCase() ? 1:-1)
            else if (document.querySelector("#ordenTipo").checked )
                this.datosFinales.sort((a,b)=>a.tipo.toUpperCase() >  b.tipo.toUpperCase() ? 1:-1)
            
            console.log(this.datosFinales)
        }
    },
    created() {
        this.fetchdata(this.url)


    }

}).mount('#app')



