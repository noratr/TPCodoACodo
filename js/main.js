
/* Header y Footer para evitar la repetición de código*/

const header = document.querySelector("header");


header.innerHTML= ' <div class="logo">'+

'<img  src="./img/logo.jpg" width="210px" height="100px" alt="Logo">'+
                 
'<p > Galeria de arte Infinitum  </p>'+

                
'</div>'+



'<nav class="nav" id="nav">'+
  
       
   
   '<ul class="nav-list">'+
       '<li><a href="./index.html">Inicio</a></li>'+
       '<li> <a href="./nosotros.html">Sobre Nosotros</a></li>'+
       '<li><a href="./blog.html">Blog</a></li>'+
       '<li><a href="./eventos.html">Eventos</a></li>'+
       '<li><a href="./contacto.html">Contacto</a></li>'+
   '</ul>'+
'</nav>'+
'</div>';


const footer = document.querySelector("footer");

footer.innerHTML =' <div>'+
'<p>Dirección: Corrientes 2540-Caba</p>'+
'<p> Horario: Lunes a Sábado de 10 a 22 hs</p></div>'+

'<div><nav class="nav-footer" >'+
   
              
    
        '<a href="https://api.whatsapp.com/send?phone=1131055321"><img src="./img/whatsapp.png" width="38px" height="38px"></a>'+
        '<a href="mailto:noratrinchero@gmail.com"><img src="./img/email.png" width="40px" height="40px"></a>'+
        '<a href="http://instagram.com/artexplota"><img src="./img/instagram.png"  width="40px" height="40px"></a>'+
        '<a href="http://facebook.com/artexplota"><img src="./img/facebook.png" width="40px" height="40px"></a>'+
        
        
'</nav></div>';















