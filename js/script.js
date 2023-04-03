


function obtenerDatos(){
return fetch("http://localhost:3000/perfil").then(respuesta=>{
 return respuesta.json();
})
}


const formulario = document.querySelector("[data-form]");


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    let emailInput = document.querySelector("[data-email]").value;
    let passInput = document.querySelector("[data-pass]").value;
    
    obtenerDatos().then( respuesta => {
        let passAdmin = respuesta[0].contrasena;
        let emailAdmin = respuesta[0].email;
        if (emailInput == emailAdmin && passInput == passAdmin) {
            setTimeout(alert("bienvenido admin"), 0);
            window.location.href= "./agregar-productos.html";

        }else { setTimeout(alert("correo o contraseña incorrecta"), 0);}
    });
    
    
})

 
 
   
