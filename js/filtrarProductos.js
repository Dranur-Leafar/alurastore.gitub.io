function buscarInput(respuesta, input){      
    //funcion para buscar el input
    const busqueda = input
    const regex = new RegExp(busqueda, 'i');
    
    const resultado = respuesta.filter((obj) => {
      return Object.values(obj).some((valor) => {
        if (Array.isArray(valor)) {
          return valor.some((opcion) => regex.test(opcion));
        } else if (typeof valor === 'object') {
          return Object.values(valor).some((valorSubObjeto) => {
            if (Array.isArray(valorSubObjeto)) {
              return valorSubObjeto.some((opcion) => regex.test(opcion));
            } else if (typeof valorSubObjeto === 'string') {
              return regex.test(valorSubObjeto);
            }
            return false;
          });
        } else if (typeof valor === 'string') {
          return regex.test(valor);
        }
        return false;
      });
    });
    
    console.log(resultado);
    return resultado 
  };

function obtenerDatos(){
    return fetch("http://localhost:3000/producto").then(respuesta=>{
     return respuesta.json();
    })}

function borrarCliente(id){
        console.log("Eliminar a -----> ", id);
        let condiciones ={method: "DELETE"};
           
    return fetch(`http://localhost:3000/producto/${id}`,condiciones).then(respuesta =>{return respuesta})
    }


const crearNuevaSeccion = (categoria, nombre, precio, descripcion, imagen, id)=> {
    
        const linea = document.createElement("li");
        const contenido = 
        `
        <img src="${imagen}" name="imagen" class="item-imagen">
          <h3 data-name class="item-titulo">${nombre}</h3>
          <h2 name="precio" class="item-precio">${precio}</h2>
          <a href="./verProducto.html" class="boton-ver" data-ver  id="${id}" >Ver producto</a>
      `
     
      
      linea.innerHTML = contenido;
      const table = document.querySelector(".catalogo__productos");
      table.appendChild(linea);

}


const lupa = document.querySelector("[data-search]");


////paso 1
lupa.addEventListener("click", () =>{
    obtenerDatos().then(respuesta =>{
      const input = document.querySelector(".encabezado__busqueda").value;
     const resultado = buscarInput(respuesta, input)
      conectando(resultado);
  
    })
})

   function conectando(resultado){
    /* const seccion = document.querySelector('.principal__catalogo');
        seccion.style.display = 'none';*/
        
        resultado.forEach(({categoria, nombre, precio, descripcion, imagen, id}) => {
                //se crea la variable nuevaLinea seleccionando los datos del array con el termino perfil."elemento" y aplicandolos a la porcion del DOM
                nuevaLinea = crearNuevaSeccion(categoria, nombre, precio, descripcion, imagen, id);
                //se asigna a la porcion del DOM creada el elemento padre Table que es una variable que toma un elemento del DOM
                
                
               
            });
        }




