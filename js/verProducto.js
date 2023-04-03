

const crearDOM = (categoria, nombre, precio, descripcion, imagen, id) => {
  const contenidoHTML =

    `<li class="catalogo__item" data-item id="${id}">
      <img src="${imagen}" name="imagen" class="item-imagen">
        <h3 data-name class="item-titulo">${nombre}</h3>
        <h2 name="precio" class="item-precio">${precio}</h2>
        <a href="#" class="boton-ver" data-ver  id="${id}" >Ver producto</a>
    </li>`

  return contenidoHTML
}

const crearDOMH = (categoria, nombre, precio, descripcion, imagen, id) => {
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
  console.log(resultado)
  const table = document.querySelector("[data-header]");
  table.innerHTML = '';

  resultado.forEach(({ categoria, nombre, precio, descripcion, imagen, id }) => {
    const table = document.querySelector("[data-header]");
    const nuevaLinea = crearDOMH(categoria, nombre, precio, descripcion, imagen, id);
    table.innerHTML += nuevaLinea;
  })
  
  
  
  
  
  ;}

const construirElemento = (resultado) => {
  console.log(resultado)
  const table = document.querySelector("[data-table]");
  table.innerHTML = '';

  resultado.forEach(({ categoria, nombre, precio, descripcion, imagen, id }) => {
    const table = document.querySelector("[data-table]");
    const nuevaLinea = crearDOM(categoria, nombre, precio, descripcion, imagen, id);
    table.innerHTML += nuevaLinea;


        //seleccionar todos los botones Ver
        const elementos = document.getElementsByClassName("boton-ver");
        //convertirlos en Array
        elementosArray = Array.from(elementos); 
        //escuchar cuando se haga clicl en alguno de ellos
        elementosArray.forEach((element) => {
          element.addEventListener('click', ()=> {
            //toma el id del boton editar  
            let id = element.id
              getDataH(id).then( (respuesta)=>{
                
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
  var res = fetch(`http://localhost:3000/producto?id=${id}`).then(res => res.json())
  console.log(res)
  return res;

}


const getData = () => {
  var res = fetch("http://localhost:3000/producto").then(res => res.json())
  console.log(res)
  return res;

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
