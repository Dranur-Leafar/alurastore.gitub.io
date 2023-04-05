function borrarProducto(id){
    console.log("Eliminar a -----> ", id);
    let opciones = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
          }, 
    };
        
    return fetch(`https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos/${id}`, opciones).then(respuesta => respuesta.json())
    .then(respuesta => {if (respuesta.deleted== true) {
        alert("producto eliminado");
        location.reload();
    }})
}

  function borrarElemento(id){
    
    console.log(id);
    borrarProducto(id).then(respuesta => console.log(respuesta)).catch(err=> alert("Ocurrio un error"))
    
    }

const crearDOM = (categoria, nombre, precio, descripcion, imagen, idrow, id) => {
    
      const contenidoHTML =
    `<li class="item__class" id="${idrow}">
        <input id="${idrow}" class="item-data" data-categoria value=${categoria} readonly="true">
        <input id="${idrow}" class="item-data" data-name value=${nombre} readonly="true">
        <input id="${idrow}" class="item-data" data-price value=${precio} readonly="true">
        <input id="${idrow}"class="item-data" data-descripcion value=${descripcion} readonly="true">
        <img class="item__imagen" src="${imagen}" data-imagen >
        <input class="item-data" data-id value=${id}  id=${idrow}readonly="true">
        <a id="${idrow}" href="#" class="boton-editar" data-edit >Editar</a >
        <a id="${idrow}" href="#" onclick = "borrarElemento(id)" data-delete >Eliminar</a>
    </li>`;
    
    
    
    return contenidoHTML
    }

function conectando(resultado){
    console.log("4 conectando")
    console.log(resultado)
    //console.log(resultado[0].fields.Descripción)
   
   
    resultado.forEach(element => {
        const categoria = element.Categoria
        const nombre = element.Nombre
        const precio = element.Precio
        const descripcion = element.Descripción
        const imagen = element.Imagen
        const idrow = element.idrow
        const id= element.id
  
              //se crea la variable nuevaLinea seleccionando los datos del array con el termino perfil."elemento" y aplicandolos a la porcion del DOM
              nuevaLinea = crearDOM(categoria, nombre, precio, descripcion, imagen, idrow, id);
              //se asigna a la porcion del DOM creada el elemento padre Table que es una variable que toma un elemento del DOM
              const table = document.querySelector("[data-table]");
              table.innerHTML += nuevaLinea;
  
          });
  
    //console.log(resultadoArray);
  
  //seleccionar todos los botones editar
  const elementos = document.querySelectorAll(".boton-editar");
  //convertirlos en Array
  elementosArray = Array.from(elementos); 
  //escuchar cuando se haga clicl en alguno de ellos
  elementosArray.forEach((element) => {
      element.addEventListener('click', ()=> {
       //toma el id del boton editar  
      let idrow = element.id
        console.log(idrow)
      //selecciona el boton editar que fue clickeado
      botonEditar = document.querySelector(`.boton-editar#${idrow}`);
  
        if (botonEditar.text === "Editar") {
          
  
      botonEditar.text = "Terminar Edicióna";
      botonEditar.style.width = '4rem';
      botonEditar.style.background = '#2A7AE4';
      botonEditar.style.color = '#EAF2FD';
      botonEditar.style.textAlign= "center";
      botonEditar.style.borderRadius= "5px"
      botonEditar.onclick = (console.log('ruta1'))
      //selecciona el renglon completo que tiene el mismo id
      renglon = document.querySelectorAll(`.item-data#${idrow}`)
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
      renglon = document.querySelectorAll(`.item-data#${idrow}`)
      //convierte en arreglo el renglon seleccionado
      renglonArray= Array.from(renglon);
      console.log(renglonArray);
      //modifica el atributo "solo lectura de cada elemento del Array"
      renglonArray.forEach((element)=> {
        element.readOnly = true;
        })
  
    
   categoria = document.querySelector(`[data-categoria]#${idrow}`).value;
   nombre = document.querySelector(`[data-name]#${idrow}`).value;
   precio = document.querySelector(`[data-price]#${idrow}`).value;
   descripcion = document.querySelector(`[data-descripcion]#${idrow}`).value;

       
  
        
   const  actualizarProducto = (categoria, nombre, precio, descripcion, idrow)=>{
    const precionumber = parseFloat(precio)
    console.log(idrow)
    const data = {
      "records":[
     
        {
         "id": idrow,
       "fields": {
          "Categoria": categoria,
          "Nombre": nombre,
          "Precio": precionumber,
          "Descripción": descripcion
          
          }
      }
  ]
    } 
    let opciones = {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
        },
        body: JSON.stringify(data)
    }
    return fetch(`https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos`,opciones).then(respuesta => console.log(respuesta.json()));
      }
      actualizarProducto(categoria, nombre, precio, descripcion, idrow);
      
    }})
  })
  
  }



function buscarInput(respuesta, input){      
    console.log("3 buscarInput")
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
    console.log("2 obtenerDatos")
    let opciones = {
      method: "GET",
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
        },
    
      }
  
   return fetch('https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos', opciones).then(respuesta => {
   const resultado = respuesta.json();
   return resultado
   
   
   /*const resultadoArray = [];
   resultado.records.forEach(element=>{
   resultadoArray.push(element.fields);})
   console.log(resultadoArray)*/
})
   

  }


const filtrarInput = () =>{
    console.log("1 filtrarInput")
    obtenerDatos().then(respuesta => {
      console.log(typeof respuesta.records)
      const resultadoArray = [];
      respuesta.records.forEach(element=>{
        element.fields.idrow = element.id
        resultadoArray.push(element.fields)
    })  
    console.log(resultadoArray);
    const input ="";
    const resultado = buscarInput(resultadoArray, input);
     
   conectando(resultado);
    })
}


window.onload = filtrarInput;