import { connectionServices } from "./services/connection-services.js";
import { controllerServices } from "./controllerServices/controllerServices";

function borrarElemento(id){
  
  console.log(id);
  connectionServices.borrarCliente(id).then(respuesta => console.log(respuesta)).catch(err=> alert("Ocurrio un error"))
  }



function editarElemento(id){

   

  const elementos = document.querySelectorAll(".item-data");
  elementosArray = Array.from(elementos); 
  elementosArray.forEach((element) => {
      element.addEventListener('click', ()=> {
      console.log(element)

      });
    });


  
}

//5

const crearDOM = (categoria, nombre, precio, descripcion, imagen, id) => {
const contenidoHTML =
`<li class="item__class" id="${id}">
    <input id="${id}" class="item-data" data-categoria value=${categoria} readonly="true">
    <input id="${id}" class="item-data" data-name value=${nombre} readonly="true">
    <input id="${id}" class="item-data" data-price value=${precio} readonly="true">
    <input id="${id}"class="item-data" data-descripcion value=${descripcion} readonly="true">
    <img class="item__imagen" src="${imagen}" data-imagen >
    <input class="item-data" data-id value=${id} readonly="true">
    <a id="${id}" href="#" class="boton-editar" data-edit >Editar</a >
    <a id="${id}" href="#" onclick = "borrarElemento(id)" data-delete >Eliminar</a>
</li>`;



return contenidoHTML
}
//4

const construirElemento = (resultado) =>{
    console.log(resultado)
    const table = document.querySelector("[data-table]");
    table.innerHTML = '';
    
    resultado.forEach(({categoria, nombre, precio, descripcion, imagen, id}) =>{
        const table = document.querySelector("[data-table]");
        const  nuevaLinea = crearDOM(categoria, nombre, precio, descripcion, imagen, id);
        table.innerHTML += nuevaLinea;
      });
      
      

      //seleccionar todos los botones editar
      const elementos = document.querySelectorAll(".boton-editar");
      //convertirlos en Array
      elementosArray = Array.from(elementos); 
      //escuchar cuando se haga clicl en alguno de ellos
      elementosArray.forEach((element) => {
          element.addEventListener('click', ()=> {
           //toma el id del boton editar  
          let id = element.id

          //selecciona el boton editar que fue clickeado
          botonEditar = document.querySelector(`.boton-editar#${id}`);

            if (botonEditar.text === "Editar") {
              

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
      })
}
//3

const getData = () => {
   var res = fetch("http://localhost:3000/producto").then(res => res.json())
   console.log(res)
   return res;
   
}
//2

const filtrarInput = () =>{
    
    getData().then(respuesta => {
    let input = document.querySelector(".encabezado__busqueda").value;
    controllerServices.buscarInput(respuesta, input);
})
construirElemento(resultado);

}
//1

window.onload = filtrarInput;





