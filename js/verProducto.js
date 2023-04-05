

const crearDOM = (categoria, nombre, precio, descripcion, imagen, idrow) => {
  const contenidoHTML =

    `<li class="catalogo__item" data-item id="${idrow}">
      <img src="${imagen}" name="imagen" class="item-imagen">
        <h3 data-name class="item-titulo">${nombre}</h3>
        <h2 name="precio" class="item-precio">${precio}</h2>
        <a href="#" class="boton-ver" data-ver  id="${idrow}" >Ver producto</a>
    </li>`

  return contenidoHTML
}

const crearDOMH = (categoria, nombre, precio, descripcion, imagen, idrow) => {
  const contenidoHTMLH =

    `<div class="ver__descripcion" >
    <img src="${imagen}" class="ver-imagen">
        <div class="descripcion__container" >
            <h2 class="descripcion-titulo">${nombre}</h2>
            <h1 class="descripcion-precio">${precio}</h1>
            <p class="descripcion-texto">${descripcion}</p>
        </div>
    </div>`

  return contenidoHTMLH
}

//4

const construirElementoH = (resultado) => {
  console.log(resultado.Descripción)
  const table = document.querySelector("[data-header]");
  table.innerHTML = '';

  
    const categoria = resultado.categoria;
    const nombre = resultado.Nombre;
    const precio = resultado.Precio;
    const imagen = resultado.Imagen;
    const descripcion = resultado.Descripción;
    const idrow = resultado.idrow;
      
    //const table = document.querySelector("[data-header]");
    const nuevaLinea = crearDOMH(categoria, nombre, precio, descripcion, imagen, idrow);
    table.innerHTML += nuevaLinea;
  
  
  
  
  
  ;}

const construirElemento = (resultado) => {
  
  const table = document.querySelector("[data-table]");
  table.innerHTML = '';
  resultado.forEach(element=> {
    const categoria = element.categoria;
    const nombre = element.Nombre;
    const precio = element.Precio;
    const imagen = element.Imagen;
    const descripcion = element.descripción;
    const idrow = element.idrow;
      
    const table = document.querySelector("[data-table]");
    const nuevaLinea = crearDOM(categoria, nombre, precio, descripcion, imagen, idrow);
    table.innerHTML += nuevaLinea;
    

        //seleccionar todos los botones Ver
        const elementos = document.querySelectorAll("[data-ver]");
        //convertirlos en Array
        elementosArray = Array.from(elementos); 
        //escuchar cuando se haga clicl en alguno de ellos
        elementosArray.forEach((element) => {
          element.addEventListener('click', ()=> {
            //toma el id del boton editar 
            console.log(element.id) 
            
             
              getDataH(element.id).then( (respuesta)=>{
                console.log(respuesta)
                construirElementoH(respuesta)
              })
              
           
            
            
            
            
            


            })
            //selecciona el renglon completo que tiene el mismo id
      
         });
      })
    }
       
        /*if (botonEditar.text === "Editar") {
          

      botonEditar.text = "Terminar Edicióna";
      botonEditar.style.width = '4rem';
      botonEditar.style.background = '#2A7AE4';
      botonEditar.style.color = '#EAF2FD';
      botonEditar.style.textAlign= "center";
      botonEditar.style.borderRadius= "5px"
      botonEditar.onclick = (console.log('ruta1'))
      //selecciona el renglon completo que tiene el mismo id
      renglon = document.querySelectorAll(`.item-data#${id}`)
      //convierte en arreglo el renglon seleccionado
      renglonArray= Array.from(renglon);
      
      //modifica el atributo "solo lectura de cada elemento del Array"
      renglonArray.forEach((element)=> {
        element.readOnly = false;
      })
        }else if(botonEditar.text = "Terminar Edicióna" ) {

          console.log('ruta2');
      
      //cambios de estilo al boton editar
      botonEditar.text = "Editar";
      botonEditar.style.width = '4rem';
      botonEditar.style.background = '#EAF2FD';
      botonEditar.style.color = '#2A7AE4';

      //selecciona el renglon completo que tiene el mismo id
      renglon = document.querySelectorAll(`.item-data#${id}`)
      //convierte en arreglo el renglon seleccionado
      renglonArray= Array.from(renglon);
      console.log(renglonArray);
      //modifica el atributo "solo lectura de cada elemento del Array"
      renglonArray.forEach((element)=> {
        element.readOnly = true;
        })
   categoria = document.querySelector(`[data-categoria]#${id}`).value;  
   nombre = document.querySelector(`[data-name]#${id}`).value;
   precio = document.querySelector(`[data-price]#${id}`).value;
   descripcion = document.querySelector(`[data-descripcion]#${id}`).value;
    
   categoria = document.querySelector(`[data-categoria]#${id}`).value;
   nombre = document.querySelector(`[data-name]#${id}`).value;
   precio = document.querySelector(`[data-price]#${id}`).value;
   descripcion = document.querySelector(`[data-descripcion]#${id}`).value;

   cat = categoria.toString();

   console.log(typeof cat);
        
   const  actualizarProducto = (categoria, nombre, precio, descripcion, id)=>{
    console.log(id)
    let opciones = {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({categoria, nombre, precio, descripcion})
        }
    return fetch(`http://localhost:3000/producto/${id}`,opciones).then(respuesta => respuesta);
      }
      actualizarProducto(cat, nombre, precio, descripcion, id);
      
    }})
  })*/


//3

const getDataH = (id) => {
  console.log("2 obtenerDatos")
  let opciones = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
      },
  
    }

 return fetch(`https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos/${id}`, opciones)
 .then(respuesta => respuesta.json())
 .then(respuesta => respuesta.fields)
  

}



const getData = () => {
  console.log("2 obtenerDatos")
  let opciones = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
      },
  
    }

 return fetch('https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos', opciones)
 .then(respuesta => respuesta.json())
 .then(respuesta => {
  console.log(respuesta.records)
  const resultadoArray = [];
  respuesta.records.forEach(element=>{
    element.fields.idrow = element.id
    resultadoArray.push(element.fields)})
    return resultadoArray})
}
//2

const filtrarInputH = () => {

  getDataH().then(respuesta => {

    //funcion para buscar el input
    let input = document.querySelector(".encabezado__busqueda").value;
    const busqueda = input;
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

    construirElementoH(resultado);
  })
}

const filtrarInput = () => {

  getData().then(respuesta => {

    //funcion para buscar el input
    let input = document.querySelector(".encabezado__busqueda").value;
    const busqueda = input;
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

    construirElemento(resultado);
  })
}


//1

window.onload = filtrarInput;
//window.onload = filtrarInputH;
