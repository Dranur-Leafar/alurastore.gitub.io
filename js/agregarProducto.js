const imageUploader = document.getElementById("img-uploader");
const imagePreview = document.getElementById("img-preview");

//WIDGET PARA SUBIR IMAGENES A CLOUDINARY
let widget_cloudinary = cloudinary.createUploadWidget({
   cloudName: 'dmim46vju',
   uploadPreset: 'dranur'
    }, (err, result) => {
    if (!err && result && result.event === 'success'){
        console.log('Imagen subida con éxito', result.info);
        imagePreview.src = result.info.secure_url;
        return imagePreview.src;
    }

});
    //FUNCION QUE DISPARA LA CARGA DE LA IMAGEN
imageUploader.addEventListener("click", () => {
    widget_cloudinary.open();
}, false);


const formulario = document.querySelector("[data-form]")

function limpiarFormulario(formulario){
    
    document.querySelector(".categoria").value="";
    document.querySelector(".nombre").value=""; 
    document.querySelector(".precio").value=""; 
    document.querySelector(".descripcion").value="";  
    
}

//funcion para agregar un producto a la base de datos 
function agregarProducto(categoria, nombre, precio, descripcion, imagen){
    const precionumber = parseFloat(precio)
    const data = {
        "records":[
       
          {
         "fields": {
            "Categoria": categoria,
            "Nombre": nombre,
            "Precio": precionumber,
            "Descripción": descripcion,
            "Imagen": imagen,
            "id": uuid.v4()
            }
        }
    ]
    } 
    let opciones = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer pat2zTQBj6IKVhgSZ.ede3d29a1cb145fef8c928d43f400078d111431eca990d3256ebdf05a674dbbe'
          },
        body: JSON.stringify(data)
        }
//body: JSON.stringify({categoria, nombre, precio, descripcion, imagen, id: uuid.v4()})
    const idok= data.records[0].fields.id
     return fetch("https://api.airtable.com/v0/appVLlnZ37HeHBIDE/Productos?maxRecords=3&view=Grid%20view",opciones).then(respuesta => {
        console.log(respuesta.json());
        return idok
    })     
}
     



//FUNCION QUE OBTIENE LOS DATOS INGRESADOS PARA POSTEARLOS EN EL SERVIDOR JSON
formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    categoria = formulario.categoria.value;
    nombre = formulario.nombre.value;
    precio = formulario.precio.value;
    descripcion = formulario.descripcion.value;
    imagen = imagePreview.src;
    agregarProducto(categoria, nombre, precio, descripcion, imagen).then((idok)=> {
                
        
        
        alert("Tu producto se agrego correctamente con el id", idok);

        
           
        
    
    })
    limpiarFormulario(formulario); 

})