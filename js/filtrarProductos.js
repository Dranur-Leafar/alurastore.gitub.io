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

const obtenerDatos = () => {
    let opciones = {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
        },
    
      }

   return fetch('https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos', opciones).then(respuesta => respuesta.json())
  }
      
  
  


function borrarCliente(id){
        console.log("Eliminar a -----> ", id);
        let condiciones ={method: "DELETE"};
           
    return fetch(`http://localhost:3000/producto/${id}`,condiciones).then(respuesta =>{return respuesta})
    }


const crearNuevaSeccion = (categoria, nombre, precio, descripcion, imagen, id)=> {     
        
  
    const linea = document.createElement("li");

        const contenido = 
        `<li data-item>
          <img src="${imagen}" name="imagen" class="item-imagen">
          <h3 data-name class="item-titulo">${nombre}</h3>
          <h2 name="precio" class="item-precio">${precio}</h2>
          <a href="./verProducto.html" class="boton-ver" data-ver  id="${id}" >Ver producto</a>
        </li>`
     
      
      linea.innerHTML = contenido;
      const table = document.querySelector(".catalogo__productos");
      table.appendChild(linea);

}


const lupa = document.querySelector("[data-search]");


////paso 1
lupa.addEventListener("click", () =>{
    obtenerDatos().then(respuesta =>{
      console.log(respuesta.records[0].fields)
     const input = document.querySelector(".encabezado__busqueda").value;
     const resultado = buscarInput(respuesta.records, input)
     conectando(resultado);
     document.querySelector(".encabezado__busqueda").value="";
    })
})

   function conectando(resultado){
    const clear = document.querySelectorAll("[data-item]");
    for (var i = 0; i < clear.length; i++) {
      clear[i].remove();
    }
    
    const resultadoArray = [];
      resultado.forEach(element=>{
      resultadoArray.push(element.fields);
 
      })
      console.log(resultadoArray);


    

        resultadoArray.forEach(element => {
          const categoria = element.Categoria
          const nombre = element.Nombre
          const precio = element.Precio
          const descripcion = element.Descripcion
          const imagen = element.Imagen
          const id = element.id

                //se crea la variable nuevaLinea seleccionando los datos del array con el termino perfil."elemento" y aplicandolos a la porcion del DOM
                nuevaLinea = crearNuevaSeccion(categoria, nombre, precio, descripcion, imagen, id);
                //se asigna a la porcion del DOM creada el elemento padre Table que es una variable que toma un elemento del DOM
                

            });
        }




