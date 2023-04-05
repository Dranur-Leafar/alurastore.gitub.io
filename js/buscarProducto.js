
const boton = document.querySelector("[data-search]");

const crearDOM = (categoria, nombre, precio, descripcion, imagen, id) => {
  /*contenido = document.querySelectorAll("[data-item]")
  conenido = "";*/
  const contenidoHTML = " ";
  contenidoHTML =

`<li data-item>
<img src=${imagen} alt="item-imagen" class="item-imagen">
         <h3 class="item-titulo">${nombre}</h3>
         <h2 class="item-precio">${precio}</h2>
         <a href="./verProducto.html"class="item-producto">Ver producto</a>
</li>`;
return contenidoHTML
}
//4

const construirElemento = (resultado) =>{
    const table = document.querySelector("[data-table]");
    table.innerHTML = ' ';
    
    resultado.forEach(({categoria, nombre, precio, descripcion, imagen, id}) =>{
        const table = document.querySelector("[data-table]");
        const  nuevaLinea = crearDOM(categoria, nombre, precio, descripcion, imagen, id);
        table.innerHTML += nuevaLinea;
})
}
//3

const getData = () => {
  let opciones = {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
      },
  
    }
  
  var res = fetch('https://api.airtable.com/v0/appUuTyRjVBssZWDA/Contacto_info?maxRecords=3&view=Grid%20view', opciones).then(res => res.json())
   //console.log(res)
   return res  
}
//2

const filtrarInput = () =>{
  const table = document.querySelector("[data-table]");
  table.innerHTML = ' ';
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
    //console.log(resultado); 

    construirElemento(resultado);
})
}
//1

boton.onclick = filtrarInput;
