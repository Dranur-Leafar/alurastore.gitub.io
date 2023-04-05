
const obtenerDatos = () => {
    console.log("1 obtenerDatos")
    let opciones = {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
        },
    
      }
  
   return fetch('https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Usuarios', opciones).then(respuesta => {
   const resultado = respuesta.json();
   console.log(resultado)
   return resultado
   
}).then(resultado => resultado.records[2].fields)
.then(respuesta=> respuesta
    
    /*{
    const email = resultado.Email
    const password = resultado.Password
    console.log(email, password)
    }*/)
   

  }


const formulario = document.querySelector("[data-form]");


formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    let emailInput = document.querySelector("[data-email]").value;
    let passInput = document.querySelector("[data-pass]").value;
    
    obtenerDatos().then( respuesta => {
        let passAdmin = respuesta.Password;
        let emailAdmin = respuesta.Email;
        if (emailInput == emailAdmin && passInput == passAdmin) {
            setTimeout(alert("bienvenido admin"), 0);
            window.location.href= "./agregar-productos.html";

        }else { setTimeout(alert("correo o contraseña incorrecta"), 0);}
    });
    
    
})

 
 
   
