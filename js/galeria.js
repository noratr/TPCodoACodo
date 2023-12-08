const { createApp } = Vue
createApp({
    data() {
        return {
            url: 'https://noratr.pythonanywhere.com/obras',
            error: false,
            
            datos: [],
            
        }
    },
    methods: {
        fetchdata(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.datos=[]
                    this.datos = data
                    
                                 

                }
                );
        }
    },
    created() {
        this.fetchdata(this.url)


    }

}).mount('#app')

